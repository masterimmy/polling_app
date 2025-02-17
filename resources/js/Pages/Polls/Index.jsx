import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

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
                        Polls
                    </h2>
                    <Button asChild>
                        <Link href="/polls/create">New Poll</Link>
                    </Button>
                </div>
            }
        >
            <Head title="Polls" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {polls?.data?.map((poll, index) => (
                                    <Link href={`/polls/${poll.id}/edit`}>
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
        </AuthenticatedLayout>
    );
}
