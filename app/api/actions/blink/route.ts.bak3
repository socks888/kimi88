import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID } from "@solana/actions"
import { Transaction, TransactionInstruction, ComputeBudgetProgram, PublicKey, Connection, clusterApiUrl, SystemProgram } from "@solana/web3.js"
// https://youtu.be/dLpu6vYsTaI?si=szmd-77j0JIDYvm-

export async function OPTIONS(request: Request) {
    return new Response(null, { headers : ACTIONS_CORS_HEADERS })
}

export async function GET(request: Request) {
    const response : ActionGetResponse  = {
        icon : new URL("/garden.jpg", new URL(request.url).origin).toString(),
        label : "Click me to donate",
        description : "Kiyomi is my beautiful woman",
        title : "Donate to my fund",
        links: {
            actions: [
                {
                    href: request.url + "?action&amount=0.01",
                    label: "0.01 SOL",
                },
                {
                    href: request.url + "?action&amount=0.05",
                    label: "0.05 SOL",
                },
                {
                    href: request.url + "?action&amount={amount}",
                    label: "another",
                    parameters:  [
                        {
                            name: "amount",
                            label: "custom",
                            required: true
                    
                    }        
                ],
                },
            ]
        },
        }
        error: {
            message: "This blink is not implemented yet!"
        }
    return Response.json(response, {
        headers : ACTIONS_CORS_HEADERS 
    });
};

// export const OPTIONS = GET;

export async function POST(request: Request){
    try {
    const body: ActionPostRequest = await request.json(); 
        let account: PublicKey
    try {
        account = new PublicKey(body.account)
        console.log(account)
    } catch (err) {
        return new Response("Invalid Public key provided", {
            status : 400,
            headers :ACTIONS_CORS_HEADERS
        });
    }

    const url = new URL(request.url);
    const action = url.searchParams.get("amount")
    console.log("amount = " + action)
    //amount = action / 100
    const transaction = new Transaction();
    //let payAmount = 
    // console.log(action)
    const ix = SystemProgram.transfer({
        fromPubkey: account,
        // toPubkey: derived from atatched wallet and needs to be added to the blink
        toPubkey:  new PublicKey("EvbHCMFaYbuqcq7omtse5KHz3mR3uHLsWxE9XkuCbDxv"),
        lamports: 0.05 //action
    })

    transaction.add(ix)
        // transaction.add(
        //        ComputeBudgetProgram.setComputeUnitPrice({
        //            microLamports : 1000,
        //        }),
        //        new TransactionInstruction({
        //            programId : new PublicKey(MEMO_PROGRAM_ID),
        //            data : Buffer.from("Kiyomi's Solana actions memo", "utf8"), 
        //            keys : []
        //    }),
        //);
    
        transaction.feePayer = account;
        const connection = new Connection(clusterApiUrl("mainnet-beta"));
        transaction.recentBlockhash = (
            await connection.getLatestBlockhash()
        ).blockhash;

        const payload: ActionPostResponse = await createPostResponse({
                fields: {
                    transaction,
                    message: "Thanks" + account + "You have paid " + action
                },
                // signers : []
        });

        return Response.json(payload, {headers: ACTIONS_CORS_HEADERS})
   
    } catch (err) {
        return Response.json("An unknown error occured, sorry!"), {status: 400}
    };
}