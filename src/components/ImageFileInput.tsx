import { useEffect, useState } from "react";
import { Text, SimpleGrid, Image } from "./base";
// import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from "@mantine/dropzone";

interface Props {
  // onChange: (files: FileWithPath[]) => void;
  size?: number | string;
  placeholder?: string;
}

function ImageFileInput({
  //onChange,
  size = 150,
  placeholder = "Inserer des images",
}: Props) {
  // const [files, setFiles] = useState<FileWithPath[]>([]);

  // const previews = files.map((file, index) => {
  //   const imageUrl = URL.createObjectURL(file);
  //   return <Image key={index} src={imageUrl} />;
  // });

  // useEffect(() => {
  //   onChange(files);
  // }, [files, onChange]);

  return (
    <div>
      {/* <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} h={"100%"} w={size}>
        {previews.length === 0 && <Text>{placeholder}</Text>}

        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 5 }}
          mt={previews.length > 0 ? "sm" : 0}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          {previews}
        </SimpleGrid>
      </Dropzone> */}
    </div>
  );
}
export default ImageFileInput;
