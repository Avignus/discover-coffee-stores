import React, { ChangeEvent, useContext, useState } from "react"
import TextInput from "./input-component"
import * as z from "zod"
import { baseUrl } from "@/lib/config"
import { dispatchCarsList } from "@/lib/cars-list"
import { StoreContext } from "@/store/store-context"

const carSchema = z.object({
    name: z.string().max(255).optional(),
    imgUrl: z.string().max(255).optional(),
    maker: z.string().max(255).optional(),
    model: z.string().max(255).nonempty(),
    package: z.string().max(255).nonempty(),
    color: z.string().max(255).nonempty(),
    year: z.string().min(4).max(4).nonempty(),
    category: z.string().max(255).nonempty(),
    mileage: z.number().nonnegative(),
    price: z.number().nonnegative().positive(),
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
    mileage: number
    price: number
}

type CarFormProps = {
    onClose: () => void
    setLoading: (condition: boolean) => void
    setModal: (condition: boolean) => void
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
        mileage: 0,
        price: 0,
    })
    const { dispatch, state } = useContext(StoreContext)
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
        const validationResult = carSchema.safeParse(formData)

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
                        body: JSON.stringify(validationResult.data), // Stringify for JSON body
                    })
                    if (response && dispatch) {
                        dispatchCarsList(dispatch)
                    }
                    console.log({ response })
                } catch (error) {
                    console.error("Error sending request:", error)
                    // Handle request errors here
                } finally {
                    setLoading(false)
                    setModal(false)
                }
            }

            // Handle form submission logic here
        } else {
            console.error("Validation error:", validationResult.error.errors)
        }
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 w-[500px] h-[1000px]">
            <div className="max-w-md w-full space-y-5">
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
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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

                    {/* ...Similar TextInput fields for other properties of CarData... */}

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
                            type="number"
                            placeholder="Mileage"
                            value={formData.mileage}
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
                            type="number"
                            placeholder="Price"
                            value={String(formData.price)}
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
            </div>
        </div>
    )
}

export default CarForm
