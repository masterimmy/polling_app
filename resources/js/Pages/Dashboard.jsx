import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function Dashboard({ polls }) {
    const user = usePage().props.auth.user;

    const { flash } = usePage().props

    useEffect(() => {
        if (flash) {
            if (flash.message) toast.info(flash.message);
            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="py-12">
                                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                {polls?.data?.map((poll, index) => (
                                                    <Link href={`/vote/${poll.id}`}>
                                                        <Card key={index}>
                                                            <CardHeader>
                                                                <CardTitle>
                                                                    {poll?.title}
                                                                </CardTitle>
                                                                <CardDescription>
                                                                    {poll?.description}
                                                                </CardDescription>
                                                                <CardDescription>
                                                                    {`Expires At: ${dayjs(poll?.expires_at).format("MMMM D, YYYY h:mm A")}`}
                                                                </CardDescription>
                                                            </CardHeader>
                                                            {user?.role === 'admin' &&
                                                                <>
                                                                    {
                                                                        poll.options.map((option) => (
                                                                            <CardContent>
                                                                                <p>{`${option?.option_text} -> ${option?.vote_count}`}</p>
                                                                            </CardContent>
                                                                        ))
                                                                    }
                                                                    < Separator />
                                                                    <CardFooter>
                                                                        {`Total Votes : ${poll?.votes_count}`}
                                                                    </CardFooter>
                                                                </>
                                                            }

                                                        </Card>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="py-12 px-4">
                                            {polls?.links.map((link) =>
                                                link?.url ? (
                                                    <Link
                                                        key={link?.label}
                                                        href={link?.url}
                                                        dangerouslySetInnerHTML={{ __html: link?.label }}
                                                        className={`p-1 mx-1 ${link?.active ? "text-blue-500 font-bold" : ""
                                                            }`}
                                                    />
                                                ) : (
                                                    <span
                                                        key={link?.label}
                                                        dangerouslySetInnerHTML={{ __html: link?.label }}
                                                        className="p-1 mx-1 text-slate-300"
                                                    ></span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
