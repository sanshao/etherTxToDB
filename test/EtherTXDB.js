let Log = require('../services/logToFile'),
    EtherTXDB = require('../services/EtherTXDB'),
    ethFUNC = require('../services/etherTxToDB');
    ERC20 = require('../assets/erc20');

describe('EtherTxToDB',()=>{
    it('db find test',(done)=>{
        let Et = EtherTXDB;
        Et.find({}).select('blockNumber').sort({blockNumber:-1}).limit(1).exec(
            (err,b)=>{
            console.dir(err);
            console.dir(b[0].blockNumber);
                Et.find({}).select('blockNumber').sort({blockNumber:1}).limit(1).exec(
                    (err,b)=>{
                        console.dir(err);
                        console.dir(b[0].blockNumber);
                        done();
                    });
        });

    });
    it('ERC20',(done)=>{
        let eFUNC = ethFUNC;
        if(!eFUNC.connect())
        {
            console.log('GETH NOT CONNECTED!');
            done();
        }else{
            const address = '0xe04f27eb70e025b78871a2ad7eabe85e61212761',
                  contractAddress = '0x57d90b64a1a57749b0f932f1a3395792e12e7055',
                  tokenContract = eFUNC.web3.eth.contract(ERC20).at(contractAddress);
            console.log(tokenContract.balanceOf(address).toNumber());
            done();
        }
    });
    it('TEST RPC',(done)=>{
        ethFUNC.gethRPC('eth_getBlockByNumber',['0x' + (2474400).toString(16),true],(e,r)=>console.log(r.result.transactions));
            done();
    });
    it('TEST IPC',(done)=>{
        let web3 = ethFUNC.connect()?ethFUNC.web3:null;
        //web3.currentProvider.on('end',()=>console.log('GET NOT CONNECTED!'));
        for(let i = 2000000;i <= 2050000;i++)
        web3.eth.getBlock(i,(e,b)=>{
            Log.log(b.number + ' ' + b.transactions.length);
            if(i === 2050000)done();
        });

    });
    it('TEST',(done)=> {
        let web3 = ethFUNC.instWeb3();
        if (web3.isConnected()) web3.eth.getBlock(74400,/*isSyncing(*/(e, b) => {
            console.dir(e);
            console.dir(b);
            done();
        })
    })
    it('Test empty db',(done)=> {
        EtherTXDB.find({}).select('blockNumber').sort({blockNumber:-1}).limit(1).exec((err,tx)=>{
            console.dir(Boolean(tx));
            done();
        });
    });
    it('Test scanInterval',(done)=> {
        ethFUNC.scanInterval({
            blockBegin: 2476000,
            blockEnd: 2477000
        }, ()=>{
            console.log('Done');
            done();
        });
    });
    it('TEST transactionsToDBHistoryRPC',(done)=>{
        ethFUNC.transactionsToDBHistoryRPC(2474418,2474450,{lastBlock:2474450}, r => console.dir(r));
        done();
    });
});