import React, { useState, useEffect } from 'react';
import { Text, Image, SimpleGrid, Button } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

interface Props {
  onChange: (files: FileWithPath[]) => void;
  size?: number | string;
  placeholder?: string;
}

const FileUploader: React.FC<Props> = ({ onChange, size = 150, placeholder = "Insérer des images" }) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const handleFileChange = (uploadedFiles: FileWithPath[]) => {
    if (uploadedFiles.length >= 5 && uploadedFiles.length <= 5) {
      setFiles(uploadedFiles);
    } else if (uploadedFiles.length < 5) {
      alert("Veuillez sélectionner au moins 5 fichiers.");
    } else {
      alert("Veuillez sélectionner au maximum 5 fichiers.");
    }
  };

  const handleFileUpload = () => {
    // Envoyer les fichiers au serveur ici
    // ...
  };

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

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

  return (
    <div>
      <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleFileChange} h={'100%'} w={size}>
        {previews.length === 0 && <Text align="center">{placeholder}</Text>}
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          mt={previews.length > 0 ? 'sm' : 0}
        >
          {previews}
        </SimpleGrid>
      </Dropzone>

      {files.length > 0 && (
        <div>
          <h4>Fichiers sélectionnés :</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                <strong>Nom :</strong> {file.name}, <strong>Taille :</strong> {file.size} octets
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={handleFileUpload} variant="outline">
        Envoyer
      </Button>
    </div>
  );
};

export default FileUploader;