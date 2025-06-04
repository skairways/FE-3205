import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, Group, Text, Space } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useMutation } from "react-query";
import { shortenUrl, ShortenUrlType } from "./api";
import { baseURL } from "../../shared/api";

type IFormValues = Omit<ShortenUrlType, "alias"> & { alias: string };

const ShortenUrlForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      originalUrl: "",
      expiresAt: null,
      alias: "",
    },
  });

  const { mutate, isLoading, isError, data } = useMutation(shortenUrl, {
    onError: () => {
      setError("originalUrl", {
        message: "Something went wrong. Please try again.",
      });
    },
  });

  const onSubmit = (formData: ShortenUrlType) => {
    const { originalUrl, expiresAt, alias } = formData;
    mutate({ originalUrl, expiresAt, alias: alias || null });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="originalUrl"
          control={control}
          render={({ field }) => (
            <TextInput
              label="Enter Original URL"
              placeholder="https://example.com"
              error={errors.originalUrl?.message}
              {...field}
            />
          )}
        />
        <Space h="lg" />
        <Controller
          name="expiresAt"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              label="Expires At"
              placeholder="Select expiration date and time"
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              {...field}
            />
          )}
        />
        <Space h="lg" />
        <Controller
          name="alias"
          control={control}
          render={({ field }) => (
            <TextInput label="Alias" placeholder="my-alias" {...field} />
          )}
        />
        <Group mt="md">
          <Button type="submit" loading={isLoading}>
            Shorten
          </Button>
        </Group>
      </form>
      {isError && <Text color="red">{errors.originalUrl?.message}</Text>}
      {data && (
        <Text mt="md" color="green">
          Shortened URL:{" "}
          <a
            href={`${baseURL}${data.shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`${baseURL}${data.shortUrl}`}
          </a>
        </Text>
      )}
    </div>
  );
};

export default ShortenUrlForm;
