// Modal.tsx
import React from "react"
import { useSpring, animated } from "react-spring"

interface ModalProps {
    showModal: boolean
    closeModal: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal, children }) => {
    const animation = useSpring({
        opacity: showModal ? 1 : 0,
        transform: showModal ? "translateY(0%)" : "translateY(-100%)",
    })

    return (
        <animated.div
            style={{
                ...animation,
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                // background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
            }}
        >
            <div
                style={{
                    background: "white",
                    padding: "40px",
                    borderRadius: "5px",
                    border: "1px solid black",
                }}
            >
                <div className="w-full flex justify-end ">
                    <div
                        className="close-button-container"
                        style={{ position: "fixed" }}
                    >
                        <button className="close-button" onClick={closeModal}>
                            <span className="close-icon">&times;</span>
                        </button>
                    </div>
                </div>

                {children}
            </div>
        </animated.div>
    )
}

export default Modal
