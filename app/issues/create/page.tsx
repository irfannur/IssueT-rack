'use client';
import React, { useState } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, Form, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueRule } from '@/app/rule/issueRule';
import { z } from 'zod';
import ErrorMsg from '@/app/component/ErrorMsg';
import Spinner from '@/app/component/Spinner';

type IssueForm = z.infer<typeof issueRule>;

const CreateIssue = () => {

const router = useRouter();
const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(issueRule)
});
const [error, setError] = useState('');
const [isSubmitting, setSubmitting] = useState(false);

  return (
      <div className='max-w-xl'>

        {error && (
            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
        )}

        <form 
        className='space-y-3' 
        onSubmit = {handleSubmit( async (data) => {
            try {
                setSubmitting(true);
                await axios.post('/api/issues', data);
                router.push('/issues');
            } catch (error) {
                setSubmitting(false);
                setError('An unexpected error occurred.');
            }
        })} >

            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')}/>
            </TextField.Root>
            <ErrorMsg>{errors.title?.message}</ErrorMsg> 
            {/* // megarah ke component/ErrorMsg */}

            <Controller 
                // karena extension (SimpleMDE) maka pakai controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Description' {...field}/>}
            />
            <ErrorMsg>{errors.description?.message}</ErrorMsg>

            <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
        </form>
    </div>
  )
}

export default CreateIssue