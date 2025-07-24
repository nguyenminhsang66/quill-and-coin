#!/usr/bin/env bash

# Check if argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <principal>"
    echo "Example: $0 rdmx6-jaaaa-aaaaa-aaadq-cai"
    exit 1
fi

PRINCIPAL=$1

echo "Checking balance for principal: $PRINCIPAL"

# Check balance using ICRC1 standard
BALANCE=$(dfx canister call icp_ledger_canister icrc1_balance_of "(record { owner = principal \"$PRINCIPAL\"; subaccount = null; })")

echo "Balance: $BALANCE e8s"

# Convert to ICP (divide by 100,000,000)
ICP_BALANCE=$(echo "scale=8; $BALANCE / 100000000" | bc -l)
echo "Balance: $ICP_BALANCE ICP"