import { Container, Title, Space, MantineProvider } from "@mantine/core";
import ShortenUrlForm from "../features/shorten-url";
import UrlInfo from "../features/url-info";
import DeleteUrl from "../features/delete-url";
import { QueryClient, QueryClientProvider } from "react-query";
import Analytics from "../features/analytics";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{ fontFamily: "Inter, sans-serif" }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Container p="xs" size="md">
          <Title order={1} mt="xl">
            URL Shortener
          </Title>
          <Space h="xl" />

          <ShortenUrlForm />
          <Space h="xl" />

          <DeleteUrl />
          <Space h="xl" />

          <UrlInfo />
          <Space h="xl" />

          <Analytics />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
