import React, { Component } from "react";
import './help.css';
import './index.css';
import Faq from "react-faq-component";

const data = {
    title: "",
    rows: [
  // --- GENERAL & BASICS ---
    {
        title: "What is the Decentralized Land Registry?",
        content: "It is a next-generation platform that uses blockchain technology to securely record land ownership. Because the ledger is distributed and immutable, it eliminates tampering, prevents property fraud, and creates a perfectly transparent history of ownership."
    },
    {
        title: "Why use Blockchain for land registration?",
        content: "Traditional paper-based registries are vulnerable to forgery, physical damage, and corruption. Blockchain ensures that once a land deed is recorded, it can never be altered or deleted without network consensus, guaranteeing absolute cryptographic proof of ownership."
    },
    {
        title: "Are these digital records legally binding?",
        content: "In this system, the digital smart contract acts as the ultimate source of truth. The platform is designed to work in tandem with government authorities (represented by the Land Inspector node) to bridge cryptographic ownership with legal real-world recognition."
    },
    {
        title: "What are the prerequisites to use this platform?",
        content: "You must have a Web3-enabled browser extension (like MetaMask) installed, an active wallet address, and sufficient native cryptocurrency (like ETH or MATIC) to cover the network 'gas fees' for processing your transactions."
    },

    // --- KYC & VERIFICATION ---
    {
        title: "How do I register as a Buyer or Seller?",
        content: "Navigate to the respective registration portal and fill out your personal details, including your Aadhar and PAN numbers. You must also upload a scanned copy of your verification document. Your account will remain 'Pending' until approved."
    },
    {
        title: "Who is the Land Inspector and what is their role?",
        content: "The Land Inspector acts as the trusted government authority on the network. They are responsible for verifying user identities (KYC), authenticating new land registrations, and approving the final transfer of deeds to ensure complete legal compliance."
    },
    {
        title: "How long does the KYC verification process take?",
        content: "Once you submit your Aadhar and PAN details, the Land Inspector must manually review the cryptographic hash of your documents. Verification typically occurs within 24 to 48 working hours."
    },
    {
        title: "Is my Aadhar and PAN data publicly visible on the blockchain?",
        content: "No. While the property history and ownership transfers are transparently recorded on the blockchain to prevent fraud, your highly sensitive personal documents are encrypted and accessible only to officially verified Land Inspectors."
    },
    {
        title: "Can I be both a Buyer and a Seller?",
        content: "Currently, wallet addresses are strictly mapped to specific roles to maintain clear audit trails. If you wish to act as both, you must register two separate wallet addresses under the respective portals."
    },

    // --- BUYING & SELLING ---
    {
        title: "How do I request to buy a property?",
        content: "Once verified as a Buyer, navigate to the 'Land Gallery'. Browse the available verified properties and click 'Request Land'. This triggers a smart contract notification to the current owner."
    },
    {
        title: "Why can't I buy a property immediately?",
        content: "Land transfers require mutual consent. Clicking 'Request' signals your intent, but the smart contract requires the current Seller to cryptographically sign an approval before the final payment window opens."
    },
    {
        title: "How do I make the final payment for a land purchase?",
        content: "After a Seller approves your request, go to the 'Make Payment' tab. The smart contract will automatically calculate the exact cryptocurrency equivalent of the property's fiat price. Confirm the transaction in MetaMask to finalize the purchase."
    },
    {
        title: "How do I list my land for sale?",
        content: "As a verified Seller, use the 'Add Land' portal. You must input the Area, City, State, Fiat Price, and the official Property Identification (PID) / Survey Number. The Land Inspector must verify these details before it appears in the public gallery."
    },
    {
        title: "How do I approve a buyer's request?",
        content: "Navigate to your 'Land Requests' dashboard. You will see a list of all wallet addresses that have requested your properties. Click 'Approve' next to your chosen buyer to authorize the final payment phase."
    },
    {
        title: "Where can I see the lands I currently own?",
        content: "Both Buyers and Sellers can view their cryptographically secured property portfolio under the 'Owned Lands' dashboard. This queries the blockchain directly to prove your current ownership status."
    },

    // --- INHERITANCE SYSTEM ---
    {
        title: "What is the Land Inheritance feature?",
        content: "It is an automated succession protocol built into our smart contracts. It allows a property owner to cryptographically designate a successor, ensuring the property transfers seamlessly without lengthy legal disputes."
    },
    {
        title: "How do I designate an heir for my property?",
        content: "Navigate to the 'Inheritance' dashboard. Select the property you own and input the public wallet address (0x...) of your chosen heir. This locks them in as the official successor on the blockchain."
    },
    {
        title: "How is a property transferred if the owner passes away?",
        content: "Upon the presentation of a real-world death certificate, the Land Inspector triggers the 'Mark Deceased' function on the blockchain. This unlocks the property, allowing the designated heir to instantly claim ownership via their dashboard."
    },
    {
        title: "Can an heir claim the property before the owner's death is verified?",
        content: "Absolutely not. The smart contract contains strict cryptographic modifiers. Any attempt by the heir to claim the property before the Land Inspector confirms the owner's passing will be automatically rejected by the blockchain."
    },
    {
        title: "Can I change my designated heir?",
        content: "Yes. As long as you are the current owner and alive, you can update the successor's wallet address at any time. The smart contract simply overwrites the previous designation."
    },

    // --- SECURITY & TECHNICAL ---
    {
        title: "What is MetaMask and why is it required?",
        content: "MetaMask is a digital wallet and gateway to the blockchain. It securely stores your private keys and acts as your digital signature, allowing you to authorize transactions and prove your identity to our smart contracts."
    },
    {
        title: "What are 'Gas Fees' and who pays them?",
        content: "Gas fees are small computational costs paid to the blockchain network (miners/validators) to process and permanently record your transactions. The user initiating the action (e.g., adding land, making payment) pays the gas fee."
    },
    {
        title: "What happens if I lose my MetaMask private key?",
        content: "Because this is a true decentralized application, your private key is your absolute proof of ownership. If you lose your private key or seed phrase, you will permanently lose access to your account and any properties tied to it. The government/platform cannot recover it for you."
    },
    {
        title: "Can the platform developers alter my land records?",
        content: "No. Once the smart contracts are deployed to the blockchain, they are immutable. The rules of ownership, transfer, and inheritance are hardcoded and cannot be bypassed by anyone, including the system administrators."
    },
    {
        title: "What happens if a transaction fails?",
        content: "If a transaction fails (due to insufficient gas, rejection, or a smart contract error), the blockchain state immediately reverts to its exact previous state. No land is transferred, and your funds (minus the initial gas attempt) remain safe in your wallet."
    }

    ],
};

const styles = {
    bgColor: 'transparent',
    titleTextColor: "var(--primary-color)",
    titleTextSize: '1.5rem',
    rowTitleColor: "#0F172A",
    rowTitleTextSize: '1rem',
    rowContentColor: '#475569',
    rowContentTextSize: '0.95rem',
    rowContentPaddingTop: '12px',
    rowContentPaddingBottom: '16px',
    rowContentPaddingLeft: '8px',
    rowContentPaddingRight: '8px',
    arrowColor: "var(--primary-color)",
    transitionDuration: "0.35s",
    timingFunc: "ease",
};

const config = {
    animate: true,
    tabFocus: true,
};

export default function Help() {
    return (
        <div className="container py-4">
            <div className="civic-card mt-2 faq-wrapper">
                <div className="faq-header">
                    <div className="faq-header-icon">
                       <i className="fas fa-info-circle"></i>
                    </div>
                    <div>
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <p className="faq-subtitle">Everything you need to know about the Land Registry platform</p>
                    </div>
                </div>

                <div className="faq-content">
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
                </div>
            </div>
        </div>
    );
}