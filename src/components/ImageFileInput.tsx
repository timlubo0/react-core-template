import { useEffect, useState } from 'react';
import { Text, Image, SimpleGrid } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

interface Props{
  onChange: (files: FileWithPath[]) => void;
  size?: number | string;
  placeholder?: string;
}

function ImageFileInput({ onChange, size = 150, placeholder = "Inserer des images" }: Props) {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
      />
    );
  });

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);
  

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={setFiles} h={'100%'} w={size}>
        {
            previews.length === 0 && <Text align="center">{placeholder}</Text>
        }
        
        <SimpleGrid
            cols={4}
            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
            mt={previews.length > 0 ? 'sm' : 0}
        >
            {previews}
        </SimpleGrid>
      </Dropzone>
    </div>
  );
}
export default ImageFileInput;