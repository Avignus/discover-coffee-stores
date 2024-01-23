import React from "react"

interface LoadingSpinnerProps {
    isLoading: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isLoading }) => {
    return (
        <div className={`loading-spinner ${isLoading ? "active" : ""}`}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingSpinner
