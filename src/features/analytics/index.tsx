import React, { useState } from "react";
import { TextInput, Button, Group, Text, Loader } from "@mantine/core";
import { useQuery } from "react-query";
import { AnalyticsResponse } from "./types";
import { fetchAnalytics } from "./api";

const Analytics: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<
    AnalyticsResponse | null,
    { message: string }
  >(["analytics", shortUrl], () => fetchAnalytics(shortUrl), {
    enabled: false,
    onError: () => {
      setError("Something went wrong. Please try again.");
    },
  });

  const handleSubmit = () => {
    if (shortUrl) {
      setError(null);
      refetch();
    } else {
      setError("Short URL is required");
    }
  };

  return (
    <div>
      <TextInput
        label="Get analytics"
        value={shortUrl}
        onChange={(e) => setShortUrl(e.target.value)}
        placeholder="abcdef"
        error={error}
      />
      <Group mt="md">
        <Button onClick={handleSubmit} disabled={isLoading}>
          Get Info
        </Button>
      </Group>
      {isLoading && <Loader />}
      {isError && <Text color="red">{error}</Text>}
      {data && (
        <div>
          <Text mt="md">URL click count: {data.totalClicks}</Text>
          {data.lastIps.length > 0 && (
            <>
              <Text mt="md">Last IPs:</Text>
              <ul>
                {data.lastIps.map((ip, index) => (
                  <li key={index}>{ip}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Analytics;
