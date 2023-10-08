import { Container, rem } from "@mantine/core";
import { Image, Title, Text, Button, SimpleGrid } from "../../../components/base";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../../navigation/routes";

interface Props {
  title: string;
  message: string;
  image?: string;
  redirectRoute?: string;
}

export function Error({ title, message, image, redirectRoute }: Props) {
  const navigate = useNavigate();

  return (
    <Container>
      <SimpleGrid spacing={80} cols={2}>
        <Image src={image || "/assets/images/404-error.svg"} />
        <div>
          <Title>{title}</Title>
          <Text color="dimmed" size="lg">
            {message}
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            onClick={() => navigate(redirectRoute || Routes.home)}
          >
            Get back to home page
          </Button>
        </div>
        <Image src={"/assets/images/404-error.svg"} />
      </SimpleGrid>
    </Container>
  );
}
