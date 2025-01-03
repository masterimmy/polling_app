import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";

export default function Index({ poll }) {
    const { data, setData, post, processing, errors } = useForm({
        poll_id: poll?.id,
        option_id: "",
    });

    const { flash } = usePage().props

    useEffect(() => {
        if (flash) {
            if (flash.message) toast.info(flash.message);
            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
        }
    }, [flash]);

    console.log('poll :>> ', poll);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/vote");
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Vote
                    </h2>

                </div>
            }
        >
            <Head title="Polls" />

            <div className="py-12">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle>{poll.title}</CardTitle>
                        <CardDescription>{poll.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <RadioGroup
                                value={data.option_id}
                                onValueChange={(value) => setData("option_id", value)}
                                className="space-y-4"
                            >
                                {poll.options.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.id.toString()} id={`option-${option.id}`} />
                                        <Label htmlFor={`option-${option.id}`}>{option.option_text}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {errors.option_id && (
                                <p className="text-red-500 text-sm mt-2">{errors.option_id}</p>
                            )}
                            <Separator className="my-6" />
                            <Button type="submit" disabled={processing} className="w-full">
                                {processing ? "Submitting..." : "Submit Vote"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}