import {
    addDoc,
    doc,
    getDocs,
    updateDoc,
    collection,
    query,
    where,
    runTransaction,
} from "firebase/firestore";
import { database, db, listInstance } from "./firebase.config";

export interface NftData {
    minter: string;
    mint: string;
}


export const saveNftData = async (nft: NftData): Promise<{ success: boolean; error?: string }> => {
    try {
        const q = query(collection(db, "nfts"), where("mint", "==", nft.mint));
        const querySnapshot = await getDocs(q);

        let id = ""; // collection id
        let regFlag = false; // register flag, true: already registered, false: new nft
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            id = doc.id;
            regFlag = true;
        });

        if (regFlag) {
            // Update the existing document
            await updateDoc(doc(db, "nfts", id), {
                minter: nft.minter,
                updateAt: new Date().getTime(),
            });
        } else {
            // Add a new document
            await addDoc(collection(db, "nfts"), {
                minter: nft.minter,
                mint: nft.mint,
                createAt: new Date().getTime(),
                updateAt: new Date().getTime(),
            });
        }

        return { success: true };
    } catch (error: any) {
        console.log("nft save error: ", error);
        return { success: false, error: error.message };
    }
};

export const updateNft = async (walletAddress: string, mint: string) => {
    try {
        const querySnapshot = await getDocs(query(
            collection(db, "whitelist"),
            where("minter", "==", walletAddress),
        ));
        if (querySnapshot.empty) {
            throw new Error(`No document found for wallet address ${walletAddress}`);
        }
        const docRef = doc(db, "whitelist", querySnapshot.docs[0].id);
        await runTransaction(db, async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists()) {
                throw new Error(`Document with ID ${docRef.id} does not exist`);
            }
            transaction.update(docRef, {
                mint: mint,
                mintDate: new Date().getTime(),
            });
        });
        console.log(`Successfully updated document with ID ${docRef.id}`);
    } catch (error) {
        console.log(error);
    }
};
