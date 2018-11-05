# mainstay API

## Database Models

### Attestation (API READ ONLY)
txid | merkle_root | confirmed | inserted_at
--- | --- | --- | ---
txid0 | 12345... | true | 2018-11-02 16:59:19.000
txid1 | 22345... | true | 2018-11-03 16:59:19.000
txid2 | 32345... | true | 2018-11-04 16:59:19.000
txid3 | 42345... | false | 2018-11-05 16:59:19.000
...

### MerkleCommitment (API READ ONLY)
merkle_root | client_position | commitment
--- | --- | ---
12345... | 0 | 6789a...
12345... | 1 | 7789a...
12345... | 2 | 8789a...
12345... | 3 | 9789a...
22345... | 0 | ...
22345... | 1 | ...
22345... | 2 | ...
22345... | 3 | ...
...

### MerkleProof (API READ ONLY)
merkle_root | client_position | commitment | ops
--- | --- | --- | ---
12345... | 0 | 6789a... | [{}, {}, ...]
12345... | 1 | 7789a... | [{}, {}, ...]
12345... | 2 | 8789a... | [{}, {}, ...]
12345... | 3 | 9789a... | [{}, {}, ...]
22345... | 0 | ... | ...
22345... | 1 | ... | ...
22345... | 2 | ... | ...
22345... | 3 | ... | ...
...

### LatestCommitment (API WRITE)
client_position | commitment
--- | ---
0 | 9abcd...
1 | 0abcd...
2 | 1abcd...
3 | 2abcd...


### columns
- confirmed: bool
- inserted_at: Date
- client_position: int32
- txid: string (64 char / 32 byte)
- merkle_root: string (64 char / 32 byte)
- commitment: string (64 char / 32 byte)
- ops: Array of ProofObject
- ProofObject: {append: bool, commitment: string(64char / 32 byte)}

## API Routes

- **/api/latestcommitment GET**

*params*: client_position

*read*: Attestation, MerkleCommitment

*return*: txid, merkle_root, commitment

- **/api/latestattestation GET**

*params*:

*read*: Attestation

*return*: txid, merkle_root

- **/api/commitment/latestproof GET**

*params*: client_position

*read*: MerkleProof

*return*: merkle_root, commitment, ops

- **/api/commitment/verify GET**

*params*: commitment, client_position

*read*: Attestation, MerkleCommitment

*return*: commitment verified or not

- **/api/commitment/proof GET**

*params*: commitment, client_position

*read*: MerkleCommitment, MerkleProof

*return*: merkle_root, commitment, ops

- **/api/commitment/send POST**

*body parameters*: client_token or id or signature, commitment

*authentication*: authenticate client

*write*: update commitment for client on LatestCommitment

*return*: acknowledgement