import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage, Link } from "@inertiajs/react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Result({ polls }) {
    const { flash } = usePage().props;

    console.log('votes :>> ', polls);

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
                    Vote Result
                </h2>
            }
        >
            <Head title="Vote" />

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

                                                            {poll.options.map((option) => (
                                                                <CardContent>
                                                                    <p>{`${option?.option_text} -> ${option?.vote_count}`}</p>
                                                                </CardContent>
                                                            ))}
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
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}