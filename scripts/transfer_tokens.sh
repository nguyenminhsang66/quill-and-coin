#!/usr/bin/env bash

# Check if arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <recipient_principal> <amount_e8s>"
    echo "Example: $0 rdmx6-jaaaa-aaaaa-aaadq-cai 100000000"
    echo "Amount should be in e8s (1 ICP = 100,000,000 e8s)"
    exit 1
fi

RECIPIENT=$1
AMOUNT=$2

# Switch to minter identity for token transfers
dfx identity use minter

echo "Transferring $AMOUNT e8s to $RECIPIENT..."

# Transfer tokens using ICRC1 standard (compatible with frontend)
dfx canister call icp_ledger_canister icrc1_transfer "(record { 
    to = record { owner = principal \"$RECIPIENT\"; }; 
    amount = $AMOUNT; 
})"

# Switch back to default identity
dfx identity use default

echo "Transfer completed!"