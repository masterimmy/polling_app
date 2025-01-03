import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "react-toastify";
import dayjs from "dayjs";

export default function Index({ polls }) {
    console.log("polls :>> ", polls);

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
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Votes
                    </h2>
                </div>
            }
        >
            <Head title="Polls" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
