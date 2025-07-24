# ✍️ Quill & Coin

A decentralized publishing platform built on the Internet Computer (ICP) where writers can publish articles and readers can reward authors with ICP tokens.

## 🌟 Features

- **Article Publishing**: Write and publish articles with title and content
- **Author Rewards**: Send ICP tokens to reward article authors
- **Internet Identity**: Secure authentication using Internet Identity
- **Decentralized Storage**: All articles stored on-chain using Motoko canisters
- **Real-time Balance**: Check your ICP balance before sending rewards
- **Responsive UI**: Modern React interface with Ant Design components

## 🏗️ Architecture

### Backend (Motoko)
- **QuillAndCoin_backend**: Main canister handling article creation and reward tracking
- **Article Management**: Create, store, and retrieve articles with timestamps
- **Reward System**: Track rewards sent between users
- **Stable Storage**: Persistent data storage across canister upgrades

### Frontend (React + TypeScript)
- **Authentication**: Internet Identity integration
- **Article Components**: Create and display articles
- **Reward System**: Send ICP tokens to authors
- **Modern UI**: Ant Design component library
- **Responsive Design**: Works on desktop and mobile

### External Dependencies
- **Internet Identity**: Decentralized authentication
- **ICP Ledger**: ICRC1 token transfers for rewards

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.0.0
- npm >= 7.0.0
- DFX >= 0.15.0
- Motoko development environment

### Local Development

1. **Clone and setup**
   ```bash
   cd QuillAndCoin/
   npm install
   ```

2. **Start local Internet Computer replica**
   ```bash
   dfx start --background
   ```

3. **Setup ICP Ledger canister**
   ```bash
   ./scripts/setup_ledger.sh
   ```

4. **Deploy canisters**
   ```bash
   dfx deploy
   ```

### 🛠️ Utility Scripts

The project includes several utility scripts for managing the ICP ledger:

#### Setup Ledger
```bash
./scripts/setup_ledger.sh
```
- Creates minter and archive controller identities
- Configures token parameters (name, symbol, fees)
- Deploys ICP ledger with initial balance

#### Transfer Tokens
```bash
./scripts/transfer_tokens.sh <recipient_principal> <amount_e8s>
```
- Transfers ICP tokens from minter to recipient
- Amount should be in e8s (1 ICP = 100,000,000 e8s)
- Example: `./scripts/transfer_tokens.sh rdmx6-jaaaa-aaaaa-aaadq-cai 100000000`

#### Check Balance
```bash
./scripts/check_balance.sh <principal>
```
- Checks ICP balance for any principal
- Displays balance in both e8s and ICP
- Example: `./scripts/check_balance.sh rdmx6-jaaaa-aaaaa-aaadq-cai`

5. **Generate candid interfaces**
   ```bash
   npm run generate
   ```

6. **Start frontend development server**
   ```bash
   npm start
   ```

Your application will be available at `http://localhost:4943?canisterId={asset_canister_id}` or the development server at `http://localhost:3000`.

## 📝 Usage

### For Writers
1. **Login** using Internet Identity
2. Click **"Write Article"** button
3. Enter article title and content
4. Click **"Publish Article"** to store on-chain

### For Readers
1. **Browse articles** on the main page
2. **Login** to reward authors
3. Click **"Reward Author"** on any article
4. Enter ICP amount and confirm transaction

## 🔧 Configuration

### Environment Variables
- `DFX_NETWORK`: Set to `ic` for mainnet deployment
- `CANISTER_ID_INTERNET_IDENTITY`: Internet Identity canister ID
- Auto-generated `.env` file contains canister IDs

### Canister Configuration (dfx.json)
- **QuillAndCoin_backend**: Motoko canister for business logic
- **QuillAndCoin_frontend**: Asset canister for React app
- **internet_identity**: Internet Identity for authentication
- **icp_ledger_canister**: ICP Ledger for token transfers

## 📊 Smart Contract Functions

### QuillAndCoin Backend
```motoko
// Create a new article
createArticle(title: Text, content: Text) -> Result<Article>

// Get all articles (sorted by creation date)
getArticles() -> Result<[Article]>

// Record a reward transaction
recordReward(recipient: Principal, amount: Nat) -> Result<Reward>

// Get all rewards
getRewards() -> Result<[Reward]>
```

### Data Types
```motoko
type Article = {
  id: Nat;
  author: Principal;
  title: Text;
  content: Text;
  created_at: Int;
};

type Reward = {
  sender: Principal;
  recipient: Principal;
  amount: Nat;
  timestamp: Int;
};
```

## 🎨 Frontend Components

### Core Components
- **ArticleList**: Display all published articles
- **CreateArticle**: Form for publishing new articles
- **AppHeader**: Navigation with login/logout
- **AppContent**: Main content wrapper

### Hooks
- **use-auth-client**: Internet Identity authentication management
- **Actor management**: Backend and ledger canister interactions

## 🔐 Security Features

- **Internet Identity**: Decentralized authentication
- **Principal-based authorization**: Caller verification for sensitive operations
- **Stable storage**: Data persistence across upgrades
- **Input validation**: Form validation on frontend and backend

## 🌐 Deployment

### Local Network
```bash
dfx start --background
./scripts/setup_ledger.sh
dfx deploy
```

### IC Mainnet
```bash
dfx deploy --network ic
```

Make sure to update environment variables for production deployment.

## 🛠️ Development

### Project Structure
```
QuillAndCoin/
├── src/
│   ├── QuillAndCoin_backend/
│   │   └── main.mo                 # Motoko backend
│   └── QuillAndCoin_frontend/
│       ├── src/
│       │   ├── components/         # React components
│       │   ├── hooks/             # Custom hooks
│       │   ├── layouts/           # Layout components
│       │   ├── App.jsx            # Main app component
│       │   └── main.jsx           # App entry point
│       └── package.json
├── scripts/
│   └── setup_ledger.sh            # Ledger setup script
├── dfx.json                       # DFX configuration
├── mops.toml                      # Motoko package manager
└── package.json                   # Root package configuration
```

### Available Scripts
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm run generate`: Generate Candid interfaces
- `dfx deploy`: Deploy all canisters
- `dfx start`: Start local replica

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with Internet Computer Protocol (ICP)
- Powered by Motoko programming language
- UI components from Ant Design
- Authentication via Internet Identity
- Based on the architecture of decentralized publishing platforms

---

**Quill & Coin** - Where writers meet rewards on the blockchain! ✍️💰
