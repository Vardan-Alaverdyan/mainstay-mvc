const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaAttestation = new Schema({
    merkle_root: String,
    txid: String,
    confirmed: Boolean,
    inserted_at: Date
}, {collection: 'Attestation'});
schemaAttestation.index({
    inserted_at: -1,
    merkle_root: 1,
    txid: 1
});

const schemaAttestationInfo = new Schema({
    txid: String,
    amount: Number,
    blockhash: String,
    time: Number
}, {collection: 'AttestationInfo'});
schemaAttestationInfo.index({
    txid: 1,
    blockhash: 1
});

const schemaClientCommitment = new Schema({
    commitment: String,
    client_position: Number
}, {
    collection: 'ClientCommitment',
    versionKey: false
});
schemaClientCommitment.index({client_position: 1});

const schemaClientDetails = new Schema({
    client_position: Number,
    auth_token: String,
    pubkey: String,
    client_name: String,
}, {collection: 'ClientDetails'});
schemaClientDetails.index({client_position: 1});

const schemaMerkleCommitment = new Schema({
    commitment: String,
    merkle_root: String,
    client_position: Number
}, {collection: 'MerkleCommitment'});
schemaMerkleCommitment.index({
    merkle_root: 1,
    client_position: 1
});

const schemaMerkleProof = new Schema({
    client_position: Number,
    merkle_root: String,
    commitment: String,
    ops: [{
        append: Boolean,
        commitment: String
    }]
}, {collection: 'MerkleProof'});
schemaMerkleProof.index({
    'merkle_root': 1,
    'commitment': 1
});

const schemaClientSignup = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    company: String,
    pubkey: String
}, {collection: 'ClientSignup'});
schemaClientSignup.index({'email': 1}, {unique: true});

const attestation = mongoose.model('Attestation', schemaAttestation);
const attestationInfo = mongoose.model('AttestationInfo', schemaAttestationInfo);
const clientCommitment = mongoose.model('ClientCommitment', schemaClientCommitment);
const clientDetails = mongoose.model('ClientDetails', schemaClientDetails);
const merkleCommitment = mongoose.model('MerkleCommitment', schemaMerkleCommitment);
const merkleProof = mongoose.model('MerkleProof', schemaMerkleProof);
const clientSignup = mongoose.model('ClientSignup', schemaClientSignup);

module.exports = {
    attestation,
    attestationInfo,
    clientCommitment,
    clientDetails,
    merkleCommitment,
    merkleProof,
    clientSignup,
};
