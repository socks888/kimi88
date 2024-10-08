import { NextRequest, NextResponse } from 'next/server';
//const { openDb } = require('../../../../db');

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, imageUrl, amount, walletAddress } = body;

        // Simple validation
        if (!title || !description || !imageUrl || !amount || !walletAddress) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ error: 'Amount must be a positive number' }, { status: 400 });
        }

        // Example: Processing data
        const processedData = {
            title: title.trim(),
            description: description.trim(),
            imageUrl: imageUrl.trim(),
            amount,
            walletAddress: walletAddress.trim(),
        };

        // Insert into database
       //  const db = await openDb();
        // await db.run(`
       //     INSERT INTO form_data (title, description, imageUrl, amount, walletAddress)
        // add data to blink code
        
        // Send the processed data in the response
        return NextResponse.json(processedData);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

export async function OPTIONS(request: Request) {
    return new Response(null, { headers : ACTIONS_CORS_HEADERS })
}

export async function GET(request: Request) {
    const response : ActionGetResponse  = {
        icon : new URL(processedData.imageUrl, new URL(request.url).origin).toString(),
        label : processedData.label,
        description : processedData.description,
        title : processedData.title,
        links: {
            actions: [
                {
                    href: request.url + "?action&amount=" + processedData.amount,
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
        toPubkey:  new PublicKey(processedData.walletAddress),
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