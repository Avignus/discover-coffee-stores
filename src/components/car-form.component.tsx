import React, { ChangeEvent, useContext, useState } from "react"
import TextInput from "./input-component"
import * as z from "zod"
import { baseUrl } from "@/lib/config"
import { dispatchCarsList } from "@/lib/cars-list"
import { StoreContext } from "@/store/store-context"
import { generateRandomCarData } from "@/utils"

const carSchema = z.object({
    name: z.string().max(255).optional(),
    imgUrl: z.string().max(255).optional(),
    maker: z.string().max(255).optional(),
    model: z.string().max(255).nonempty(),
    package: z.string().max(255).nonempty(),
    color: z.string().max(255).nonempty(),
    year: z.string().min(4).max(4).nonempty(),
    category: z.string().max(255).nonempty(),
    mileage: z.string().nonempty(),
    price: z.string().nonempty(),
})

interface CarData {
    name?: string
    imgUrl?: string
    maker?: string
    model: string
    package: string
    color: string
    year: string
    category: string
    mileage: string
    price: string
}

type CarFormProps = {
    onClose: () => void
    setLoading: (condition: boolean) => void
    setModal: (condition: boolean) => void
}

export const maskCurrencyInput = (value: string, type = "$"): string => {
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d)(\d{2})$/, "$1,$2")
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")

    return `${type} ${value}`
}

export const formatToBRLCurrency = (
    value: number,
    maximumFractionDigits: number = 2
): string => {
    return value?.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits,
    })
}

const CarForm = ({ onClose, setLoading, setModal }: CarFormProps) => {
    const [formData, setFormData] = useState<CarData>({
        imgUrl: "",
        maker: "",
        model: "",
        package: "",
        color: "",
        year: "",
        category: "",
        mileage: "",
        price: "",
    })
    const { dispatch } = useContext(StoreContext)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const key = event.target.name
        const value =
            event.target.type === "number"
                ? parseFloat(event.target.value)
                : event.target.value
        setFormData({ ...formData, [key]: value })
    }

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()

        // Validate using Zod schema
        const validationResult = carSchema.safeParse({
            ...formData,
        })

        if (validationResult.success) {
            console.log("Form submitted with data:", validationResult.data)

            if (validationResult.data) {
                try {
                    setLoading(true)
                    const response = await fetch(`${baseUrl}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(validationResult.data),
                    })
                    if (response && dispatch) {
                        dispatchCarsList(dispatch)
                    }
                    console.log({ response })
                } catch (error) {
                    console.error("Error sending request:", error)
                } finally {
                    setLoading(false)
                    setModal(false)
                }
            }
        } else {
            console.error("Validation error:", validationResult.error.errors)
        }
    }

    const fillFormRandomly = () => {
        const data = generateRandomCarData()
        setFormData(data)
    }
    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-[500px] h-[1150px]">
            <div className="max-w-md w-full space-y-5 h-[100%]">
                <div
                    onClick={onClose}
                    className="w-[100%] flex items-center justify-end"
                >
                    <h2 className="text-black text-3xl font-extrabold cursor-pointer mt-4">
                        X
                    </h2>
                </div>
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Car Information
                    </h2>
                </div>
                <form className="space-y-6 p-3" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-black" htmlFor="model">
                            Model:
                        </label>
                        <TextInput
                            id="model"
                            name="model"
                            placeholder="Model"
                            onChange={handleChange}
                            value={formData.model}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="imgUrl">
                            Image URL:
                        </label>
                        <TextInput
                            id="imgUrl"
                            name="imgUrl"
                            placeholder="Image URL"
                            onChange={handleChange}
                            value={formData.imgUrl}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="maker">
                            Maker:
                        </label>
                        <TextInput
                            id="maker"
                            name="maker"
                            placeholder="Maker"
                            onChange={handleChange}
                            value={formData.maker}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="package">
                            Package:
                        </label>
                        <TextInput
                            id="package"
                            name="package"
                            placeholder="Package"
                            onChange={handleChange}
                            value={formData.package}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="color">
                            Color:
                        </label>
                        <TextInput
                            id="color"
                            name="color"
                            placeholder="Color"
                            onChange={handleChange}
                            value={formData.color}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="year">
                            Year:
                        </label>
                        <TextInput
                            id="year"
                            name="year"
                            type="string"
                            placeholder="Year"
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="mileage">
                            Mileage:
                        </label>
                        <TextInput
                            id="mileage"
                            name="mileage"
                            placeholder="Mileage"
                            value={maskCurrencyInput(
                                String(formData.mileage),
                                "mi"
                            )}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="price">
                            Price:
                        </label>
                        <TextInput
                            id="price"
                            name="price"
                            placeholder="Price"
                            value={maskCurrencyInput(String(formData.price))}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="text-black" htmlFor="price">
                            Category:
                        </label>
                        <TextInput
                            id="category"
                            name="category"
                            placeholder="Category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end w-[100%]">
                        <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </form>
                <div className="flex justify-end w-[100%]">
                    <button
                        onClick={fillFormRandomly}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                    >
                        Mock (dev)
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CarForm
