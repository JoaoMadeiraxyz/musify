import { storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

type uploadFileProps = {
  file: File;
  file_name: string;
  folder: string;
  owner_id: string;
};

export async function uploadImage({
  file,
  file_name,
  folder,
  owner_id,
}: uploadFileProps): Promise<string> {
  try {
    const ownerStorageFolderRef = ref(storage, owner_id);
    const folderStorageRef = ref(ownerStorageFolderRef, folder);

    const fileRef = ref(folderStorageRef, file_name);

    await uploadBytes(fileRef, file);

    const downloadURL = await getDownloadURL(fileRef);

    return downloadURL;
  } catch (error) {
    console.error(error);
    throw new Error("Houve um erro ao enviar a imagem");
  }
}
