/**
 * Example: form with Zod schema and React Hook Form (React Native).
 * Use Controller for TextInput; use zodResolver(schema) for validation.
 *
 * @see https://react-hook-form.com/
 * @see https://zod.dev/
 */

import type { ReactElement } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const exampleSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
});

type ExampleFormData = z.infer<typeof exampleSchema>;

export const ExampleFormScreen = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: ExampleFormData): void => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email?.message != null ? (
        <Text style={styles.error}>{errors.email.message}</Text>
      ) : null}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            style={styles.input}
          />
        )}
      />
      {errors.password?.message != null ? (
        <Text style={styles.error}>{errors.password.message}</Text>
      ) : null}
      <Button
        title="Submit"
        onPress={() => {
          void handleSubmit(onSubmit)();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: { borderWidth: 1, padding: 12, marginBottom: 8 },
  error: { color: 'red', marginBottom: 8 },
});
