import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function History({ votes }) {
    const { flash } = usePage().props;

    console.log('votes :>> ', votes);

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
                        Vote History
                    </h2>
                </div>
            }
        >
            <Head title="Votes" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {votes.data.length > 0 ? (
                        <div className="space-y-4">
                            {votes.data.map((vote, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{vote.poll.title}</CardTitle>
                                        <CardDescription>
                                            Voted:   {`${dayjs(vote?.created_at).format("MMMM D, YYYY h:mm A")}`}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center space-x-2">
                                            <Label>Selected Option:</Label>
                                            <span className="font-medium">{vote.option.option_text}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="p-6">
                                <p className="text-center text-gray-500">No voting history found</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}