'use client';
import React, { useState } from 'react';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { Controller, Form, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { issueRule } from '@/app/rule/issueRule';
import { z } from 'zod';
import ErrorMsg from '@/app/component/ErrorMsg';
import Spinner from '@/app/component/Spinner';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueRule>;

const IssueForm = ({ issue }: { issue?: Issue } ) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueRule)
    });
    const [error, setError] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const doSubmit = handleSubmit(async (data) => {
        console.log(data);
        try {
            setSubmitting(true);
            if (issue) { 
                await axios.patch('/api/issues/' + issue.id, data);
            } else {
                await axios.post('/api/issues', data);
            }

            router.push('/issues/list');
            router.refresh();
        } catch (error) {
            setSubmitting(false);
            setError('An unexpected error occurred.');
        }
    })

    const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
        ssr: false,
    });

    return (
        <div className='max-w-xl'>

            {error && (
                <Callout.Root color='red' className='mb-5'>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}

            <form
                className='space-y-3'
                onSubmit={doSubmit} >

                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMsg>{errors.title?.message}</ErrorMsg>
                {/* // megarah ke component/ErrorMsg */}

                <Controller
                    // karena extension (SimpleMDE) maka pakai controller
                    name="description"
                    defaultValue={issue?.description}
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMsg>{errors.description?.message}</ErrorMsg>

                <Button disabled={isSubmitting}>
                    {issue ? 'Edit Issue' : 'Submit New Issue'} 
                    {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm;