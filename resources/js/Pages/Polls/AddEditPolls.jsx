import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function AddEditPolls({ poll }) {
    const formatDateTimeLocal = (date) => {
        return dayjs(date).format("YYYY-MM-DDTHH:mm");
    };

    const { data, setData, post, put, processing, errors } = useForm({
        title: poll?.title,
        description: poll?.description,
        expires_at: poll?.expires_at ? formatDateTimeLocal(poll.expires_at) : "",
        options: poll?.options || [],
    });

    console.log('polls :>> ', poll);

    const { flash } = usePage().props

    useEffect(() => {
        if (flash) {
            if (flash.message) toast.info(flash.message);
            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
        }
    }, [flash]);

    const handleOptionChange = (index, value) => {
        const newOptions = [...data.options];
        newOptions[index] = value;
        setData('options', newOptions);
    };

    const addOption = () => {
        setData('options', [...data.options, '']);
    };

    const removeOption = (index) => {
        const newOptions = data.options.filter((_, i) => i !== index);
        setData('options', newOptions);
    };

    const getOptionError = (index) => {
        return errors[`options.${index}`];
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (poll) {
            put(`/polls/${poll?.id}`);
        } else {
            post('/polls');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Add Poll
                    </h2>
                    {poll && <Button asChild>
                        <Link method="delete" href={`/polls/${poll?.id}`}>Delete</Link>
                    </Button>}

                </div>
            }
        >
            <Head title="Create Poll" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Create New Poll</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        placeholder="Enter poll title"
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-red-500">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        placeholder="Enter poll description"
                                        className="h-32"
                                    />
                                    {errors.description && (
                                        <p className="text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expires_at">Expires At</Label>
                                    <Input
                                        id="expires_at"
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={e => setData('expires_at', e.target.value)}
                                    />
                                    {errors.expires_at && (
                                        <p className="text-sm text-red-500">{errors.expires_at}</p>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <Label>Options</Label>
                                    {data.options.map((option, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    value={option}
                                                    onChange={e => handleOptionChange(index, e.target.value)}
                                                    placeholder={`Option ${index + 1}`}
                                                />
                                                {index > 0 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeOption(index)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                            {errors.options ? <p className="text-sm text-red-500">{errors.options}</p> :
                                                <p className="text-sm text-red-500">{getOptionError(index)}</p>
                                            }
                                        </div>
                                    ))}

                                    <Button
                                        disabled={processing}
                                        type="button"
                                        variant="outline"
                                        onClick={addOption}
                                        className="mt-2"
                                    >
                                        <Plus className="mr-2 h-4 w-4" />
                                        Add Option
                                    </Button>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={processing}
                                >
                                    {poll ? 'Update Poll' : 'Save Poll'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}