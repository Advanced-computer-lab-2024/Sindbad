import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function Documents({ userData }) {
    const idSrc = `data:image/jpeg;base64,${btoa(
        new Uint8Array(userData.idCardImage?.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )}`;
    const certSrc = `data:image/jpeg;base64,${btoa(
        new Uint8Array(userData.certificateImage?.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )}`;
    const taxSrc = `data:image/jpeg;base64,${btoa(
        new Uint8Array(userData.taxationRegistryCardImage?.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
    )}`;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
                <h1 className="text-3xl font-extrabold">
                    Documents
                </h1>
                <hr className="border-neutral-300 border w-full mt-1.5" />
            </div>
            <div className="flex gap-6">
                {userData?.idCardImage &&
                    <div className="w-1/2 shrink-0">
                        <h2 className="text-lg font-semibold mb-1">
                            ID Card
                        </h2>
                        <img
                            src={idSrc}
                            alt="ID Card"
                            className="w-full"
                        />
                        <a
                            href={idSrc}
                            download={`${userData.username}_id_card.jpg`}
                            className="flex mt-1.5 gap-2 items-center w-max"
                        >
                            <Download className="shrink-0" size={16} />
                            <Button className="p-0" variant="link">
                                Download
                            </Button>
                        </a>
                    </div>
                }
                {userData?.certificateImage &&
                    <div className="w-1/2 shrink-0">
                        <h2 className="text-lg font-semibold mb-1">
                            Certificate
                        </h2>
                        <img
                            src={certSrc}
                            alt="Certificate"
                            className="w-full"
                        />
                        <a
                            href={certSrc}
                            download={`${userData.username}_certificate.jpg`}
                            className="flex mt-1.5 gap-2 items-center w-max"
                        >
                            <Download className="shrink-0" size={16} />
                            <Button className="p-0" variant="link">
                                Download
                            </Button>
                        </a>
                    </div>
                }
                {userData?.taxationRegistryCardImage &&
                    <div className="w-1/2 shrink-0">
                        <h2 className="text-lg font-semibold mb-1">
                            Taxation Registry Card
                        </h2>
                        <img
                            src={taxSrc}
                            alt="Taxation Registry Card"
                            className="w-full"
                        />
                        <a
                            href={taxSrc}
                            download={`${userData.username}_taxation_registry_card.jpg`}
                            className="flex mt-1.5 gap-2 items-center w-max"
                        >
                            <Download className="shrink-0" size={16} />
                            <Button className="p-0" variant="link">
                                Download
                            </Button>
                        </a>
                    </div>
                }
            </div>
        </div>
    );
}

export default Documents;