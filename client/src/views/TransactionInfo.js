import React, { Component } from 'react';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import { Line, Bar } from "react-chartjs-2";
import '../index.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { DrizzleProvider } from 'drizzle-react';
import { Spinner } from 'react-bootstrap'
import {
    LoadingContainer,
    AccountData,
    ContractData,
    ContractForm
} from 'drizzle-react-components'

// reactstrap components
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip,
} from "reactstrap";


const drizzleOptions = {
    contracts: [Land]
}

var completed = true;

class TransactionInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,
            verified: '',
            landTable: [],
        }
    }

    landTransfer = (landId, newOwner) => async () => {

        await this.state.LandInstance.methods.LandOwnershipTransfer(
            landId, newOwner
        ).send({
            from: this.state.account,
            gas: 2100000
        });
        //Reload
        console.log(newOwner);
        console.log(completed);
        // this.setState({completed:false});
        completed = false;
        console.log(completed);

        window.location.reload(false);

    }


    componentDidMount = async () => {
    if (!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }

    try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const currentAddress = await web3.currentProvider.selectedAddress;
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Land.networks[networkId];
        const instance = new web3.eth.Contract(
            Land.abi,
            deployedNetwork && deployedNetwork.address,
        );

        this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });

        var verified = await this.state.LandInstance.methods.isLandInspector(currentAddress).call();
        this.setState({ verified: verified });

        try {
            var count = await this.state.LandInstance.methods.getLandsCount().call();
            count = parseInt(count);

            var rowsArea = [];
            var rowsCity = [];
            var rowsState = [];
            var rowsPrice = [];
            var rowsPID = [];
            var rowsSurvey = [];

            // FIXED: push values into arrays inside the loop
            for (var i = 1; i < count + 1; i++) {
                rowsArea.push(await this.state.LandInstance.methods.getArea(i).call());
                rowsCity.push(await this.state.LandInstance.methods.getCity(i).call());
                rowsState.push(await this.state.LandInstance.methods.getState(i).call());
                rowsPrice.push(await this.state.LandInstance.methods.getPrice(i).call());
                rowsPID.push(await this.state.LandInstance.methods.getPID(i).call());
                rowsSurvey.push(await this.state.LandInstance.methods.getSurveyNumber(i).call());
            }

            var reqCount = await this.state.LandInstance.methods.getRequestsCount().call();
            var reqsByLand = {};
            for (var i = 1; i <= reqCount; i++) {
                var req = await this.state.LandInstance.methods.getRequestDetails(i).call();
                if (req[3]) {
                    reqsByLand[req[2]] = req[1];
                }
            }

            var localLandTable = [];
            for (var i = 0; i < count; i++) {
                var landId = i + 1;
                
                // 1. Check if the buyer has paid
                var isPaid = await this.state.LandInstance.methods.isPaid(landId).call();

                if (isPaid) {
                    // 2. Grab the current owner and the expected buyer
                    var owner = await this.state.LandInstance.methods.getLandOwner(landId).call();
                    var buyerId = reqsByLand[landId] || "Unknown Buyer";

                    // 3. Check if the transaction is already completed
                    // If the owner address matches the buyer address, the inspector already approved it
                    var isTransferComplete = (owner === buyerId);

                    // 4. Draw the row for EVERY paid transaction, but disable the button if completed
                    localLandTable.push(<tr key={"land-" + landId}>
                        <td>{landId}</td>
                        <td>{owner}</td>
                        <td>{rowsArea[i]}</td>
                        <td>{rowsCity[i]}</td>
                        <td>{rowsState[i]}</td>
                        <td>{rowsPrice[i]}</td>
                        <td>{rowsPID[i]}</td>
                        <td>{rowsSurvey[i]}</td>
                        <td>
                            <Button 
                                onClick={this.landTransfer(landId, buyerId)}
                                disabled={!completed || isTransferComplete} 
                                className={isTransferComplete ? "btn btn-success" : "button-vote"}
                            >
                                {isTransferComplete ? "Verified" : "Verify Transaction"}
                            </Button>
                        </td>
                    </tr>)
                }
            }

            this.setState({ landTable: localLandTable });

        } catch (contractErr) {
            console.error("Contract data fetch error in TransactionInfo.js:", contractErr);
            this.setState({ landTable: [], loadingError: true });
        }

    } catch (error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
        this.setState({ landTable: [], loadingError: true });
    }
};


    render() {
        if (!this.state.web3 || !this.state.LandInstance) { 
            return <div>Loading Web3...</div>; 
        }

        if (!this.state.verified) {
            return (
                <div className="content">
                    <Row>
                        <Col xs="6">
                            <Card className="card-chart">
                                <CardBody>
                                    <h1>You are not verified to view this page</h1>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        }

        return (
            <div className="content">
                <Row>
                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h6">Lands Info</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive color="black">
                                    <thead className="text-primary">
                                        <tr>
                                            <th>#</th>
                                            <th>Owner ID</th>
                                            <th>Area</th>
                                            <th>City</th>
                                            <th>State</th>
                                            <th>Price</th>
                                            <th>Property PID</th>
                                            <th>Survey Number</th>
                                            <th>Verify Land Transfer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.landTable || []}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TransactionInfo;
