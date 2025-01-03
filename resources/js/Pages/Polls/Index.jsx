import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";

export default function Index({ polls }) {
    console.log("polls :>> ", polls);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Polls
                </h2>
                
            }
        >
            <Head title="Polls" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {polls?.data?.map((poll, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <CardTitle>
                                                {poll?.title}
                                            </CardTitle>
                                            <CardDescription>
                                                {poll?.description}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Card Content {index + 1}</p>
                                        </CardContent>
                                        <CardFooter>
                                            <p>Card Footer {index + 1}</p>
                                        </CardFooter>
                                    </Card>
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
