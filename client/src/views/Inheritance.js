import React, { Component } from 'react';
import Land from "../artifacts/Land.json";
import getWeb3 from "../getWeb3";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardHeader, CardBody, CardTitle, FormGroup, Input, Row, Col, Container } from "reactstrap";

class Inheritance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LandInstance: undefined,
            account: null,
            web3: null,

            // Form states
            landIdForHeir: '',
            heirAddress: '',
            landIdForDeceased: '',
            landIdForClaim: ''
        };
    }

    componentDidMount = async () => {
        try {
            const web3 = await getWeb3();
            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = Land.networks[networkId];
            const instance = new web3.eth.Contract(
                Land.abi,
                deployedNetwork && deployedNetwork.address,
            );

            this.setState({ LandInstance: instance, web3: web3, account: accounts[0] });
        } catch (error) {
            alert(`Failed to load web3, accounts, or contract.`);
            console.error(error);
        }
    };

    // --- Action 1: Owner designates an heir ---
    handleDesignateHeir = async () => {
        try {
            await this.state.LandInstance.methods.designateHeir(
                this.state.landIdForHeir,
                this.state.heirAddress
            ).send({ from: this.state.account, gas: 2100000 });
            alert("Heir designated successfully!");
        } catch (error) {
            console.error(error);
            alert("Transaction failed. Are you the owner of this land?");
        }
    }

    // --- Action 2: Inspector marks owner as deceased ---
    handleMarkDeceased = async () => {
        try {
            await this.state.LandInstance.methods.markDeceased(
                this.state.landIdForDeceased
            ).send({ from: this.state.account, gas: 2100000 });
            alert("Owner marked as deceased by Inspector.");
        } catch (error) {
            console.error(error);
            alert("Transaction failed. Are you logged in as the Inspector?");
        }
    }

    // --- Action 3: Heir claims the land ---
    handleClaimInheritance = async () => {
        try {
            await this.state.LandInstance.methods.claimInheritance(
                this.state.landIdForClaim
            ).send({ from: this.state.account, gas: 2100000 });
            alert("Inheritance claimed! You are the new owner.");
        } catch (error) {
            console.error(error);
            alert("Claim failed. Is the owner marked deceased, and are you the exact heir?");
        }
    }

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }

        return (
            <Container fluid className="content">
                <Row>
                    {/* Panel 1: For the Land Owner */}
                    <Col xs="12" md="12" lg="4" className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <CardHeader>
                                <CardTitle tag="h4">1. Designate Heir (Owner)</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <label>Land ID</label>
                                    <Input type="number" onChange={(e) => this.setState({ landIdForHeir: e.target.value })} />
                                </FormGroup>
                                <FormGroup>
                                    <label>Heir's Wallet Address</label>
                                    <Input type="text" onChange={(e) => this.setState({ heirAddress: e.target.value })} />
                                </FormGroup>
                                <Button className="btn-fill" color="primary" onClick={this.handleDesignateHeir}>
                                    Set Heir
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Panel 2: For the Inspector */}
                    <Col xs="12" md="12" lg="4" className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <CardHeader>
                                <CardTitle tag="h4">2. Mark Deceased (Inspector)</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <label>Land ID</label>
                                    <Input type="number" onChange={(e) => this.setState({ landIdForDeceased: e.target.value })} />
                                </FormGroup>
                                <br /><br />
                                <Button className="btn-fill" color="danger" onClick={this.handleMarkDeceased}>
                                    Confirm Deceased
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>

                    {/* Panel 3: For the Heir */}
                    <Col xs="12" md="12" lg="4" className="mb-4">
                        <Card className="h-100 shadow-sm">
                            <CardHeader>
                                <CardTitle tag="h4">3. Claim Property (Heir)</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <FormGroup>
                                    <label>Land ID</label>
                                    <Input type="number" onChange={(e) => this.setState({ landIdForClaim: e.target.value })} />
                                </FormGroup>
                                <br /><br />
                                <Button className="btn-fill" color="success" onClick={this.handleClaimInheritance}>
                                    Claim Inheritance
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Inheritance;