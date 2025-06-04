import React from "react";

const Features = () => {
    const features = [
        {
            title: "Gia sư chuyên nghiệp",
            description: "Hàng nghìn gia sư có kinh nghiệm.",
        },
        {
            title: "Học linh hoạt",
            description: "Chọn giờ học phù hợp với bạn.",
        },
        {
            title: "Giá cả hợp lý",
            description: "Lựa chọn gia sư theo ngân sách của bạn.",
        },
        {
            title: "Công nghệ tiên tiến",
            description: "Học trực tuyến với công cụ hỗ trợ hiệu quả.",
        },
    ];

    return (
        <div className="py-16 bg-gray-100 text-center">
            <h2 className="text-3xl font-bold text-[#000080]">
                Tại sao chọn chúng tôi?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8 px-10">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-lg"
                    >
                        <h3 className="text-xl font-semibold text-[#000080]">
                            {feature.title}
                        </h3>
                        <p className="text-gray-600 mt-2">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
