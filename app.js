/* eslint-disable @typescript-eslint/no-unused-vars */
const SHA256 = require('crypto-js/sha256');

class block{
    constructor(index, timestamp, data, prevHash=''){
            this.index=index;
            this.timestamp=timestamp;
            this.data=data;
            this.prevHash=prevHash;
            this.hash=this.calculateHash();
           // this.nonce=0;
    }

    calculateHash()
    {
         return SHA256(this.index + this.timestamp + this.prevHash + JSON.stringify(this.data)/* + this.nonce */).toString();
    }

   /* mineBlock(difficulty){
           while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
               this.nonce++;
               this.hash=this.calculateHash();
           }

           console.log("Block mined : " + this.hash);
    } */
}

class blockchain{
    constructor(){
        this.chain=[this.createFirstBlock()]; //array of blocks 
        //this.difficulty=2;
    }

    createFirstBlock(){
        return new block(0,"27/11/2021","First Block","0");
    }

    getLastBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.prevHash=this.getLastBlock().hash;
        newBlock.hash=newBlock.calculateHash();
      // newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid()
    {
        for(let i=1;i<this.chain.length;i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock=this.chain[i-1];
        

          if(currentBlock.hash!==currentBlock.calculateHash()){
            return false;
           }
           if(currentBlock.prevHash!==previousBlock.hash){
            return false;
           }

        }
        return true;
    }
    
}


let medRecord=new blockchain();
medRecord.addBlock(new block(1,"22/5/2021",{medicine : 4562}));
medRecord.addBlock(new block(2,"27/5/2021",{medicine : 4589}));
medRecord.addBlock(new block(3,"25/8/2021",{medicine : 4789}));

//medRecord.chain[1].data={medicine : 5555};

function add(){

    

    
    let medRecord=new blockchain();
    let a = document.getElementById("details").toString();
    let b=document.getElementById("date").toString();
     medRecord.addBlock(new block(2,b,{medicine : a}));
    
      

        
}

if(medRecord.isChainValid()===true)
console.log(JSON.stringify(medRecord,null,4));
else
console.log("Invalid blockchain");