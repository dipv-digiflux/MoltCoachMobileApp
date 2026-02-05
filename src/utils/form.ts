/**
 * React Hook Form + Zod integration.
 *
 * Usage:
 *   import { useForm, Controller } from 'react-hook-form';
 *   import { zodResolver } from '@hookform/resolvers/zod';
 *   import { z } from 'zod';
 *
 *   const schema = z.object({ name: z.string().min(1) });
 *   type FormData = z.infer<typeof schema>;
 *   const { control, handleSubmit } = useForm<FormData>({
 *     resolver: zodResolver(schema),
 *     defaultValues: { name: '' },
 *   });
 *
 * In React Native use Controller (not register) for TextInput.
 *
 * @see https://react-hook-form.com/
 * @see https://zod.dev/
 */

export { zodResolver } from '@hookform/resolvers/zod';
export { z } from 'zod';
