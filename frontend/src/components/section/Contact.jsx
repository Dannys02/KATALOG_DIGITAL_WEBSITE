import React, { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Send,
    MessageCircle,
    Clock,
    CheckCircle,
    AlertCircle
} from "lucide-react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = "Nama harus diisi";
        if (!formData.email.trim()) {
            newErrors.email = "Email harus diisi";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Format email tidak valid";
        }
        if (!formData.subject.trim()) newErrors.subject = "Subjek harus diisi";
        if (!formData.message.trim()) newErrors.message = "Pesan harus diisi";

        return newErrors;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                });
            }, 3000);
        } else {
            setErrors(validationErrors);
        }
    };

    const createMessageCircleLink = () => {
        const phoneNumber = "6281234567890"; // Ganti dengan nomor WA yang diinginkan
        const message = `Halo, saya ${formData.name}%0AEmail: ${formData.email}%0ASubjek: ${formData.subject}%0APesan: ${formData.message}`;
        return `https://wa.me/${phoneNumber}?text=${message}`;
    };

    const createEmailLink = () => {
        const email = "contact@dannysstore.com"; // Ganti dengan email yang diinginkan
        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
            `Nama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\n\n${formData.message}`
        );
        return `mailto:${email}?subject=${subject}&body=${body}`;
    };

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Telepon",
            info: "+62 812-3456-7890",
            desc: "Senin - Jumat, 09:00 - 18:00"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            info: "contact@dannysstore.com",
            desc: "Respon dalam 24 jam"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Lokasi",
            info: "Jakarta, Indonesia",
            desc: "Katalog digital online"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: "Jam Operasional",
            info: "Senin - Sabtu",
            desc: "08:00 - 19:00 WIB"
        }
    ];

    return (
        <section
            id="kontak"
            className="py-20 bg-gradient-to-b from-gray-900 via-indigo-950 to-gray-900"
        >
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/10">
                        <MessageSquare className="w-4 h-4 text-indigo-300" />
                        <span className="text-sm font-medium text-indigo-200">
                            Hubungi Kami
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-white via-indigo-100 to-white bg-clip-text text-transparent">
                            Butuh Bantuan?
                        </span>
                    </h2>

                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Tim support kami siap membantu Anda menemukan produk
                        digital yang tepat
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div>
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-8">
                                Informasi Kontak
                            </h3>

                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                                            <div className="text-indigo-300">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-300">
                                                {item.info}
                                            </p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Success Message */}
                            {isSubmitted && (
                                <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500/20 to-emerald-900/20 rounded-xl border border-emerald-500/30">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <p className="font-medium text-white">
                                                Pesan Terkirim!
                                            </p>
                                            <p className="text-sm text-gray-300">
                                                Tim kami akan menghubungi Anda
                                                segera
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-8">
                            Kirim Pesan
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-white/10 border ${
                                        errors.name
                                            ? "border-rose-500/50"
                                            : "border-white/20"
                                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                                    placeholder="Masukkan nama Anda"
                                />
                                {errors.name && (
                                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>

                            {/* Email & Phone Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full bg-white/10 border ${
                                            errors.email
                                                ? "border-rose-500/50"
                                                : "border-white/20"
                                        } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                                        placeholder="email@contoh.com"
                                    />
                                    {errors.email && (
                                        <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                            <AlertCircle className="w-4 h-4" />
                                            <span>{errors.email}</span>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Telepon (Opsional)
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                                        placeholder="+62 812-3456-7890"
                                    />
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">
                                    Subjek
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full bg-white/10 border ${
                                        errors.subject
                                            ? "border-rose-500/50"
                                            : "border-white/20"
                                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300`}
                                    placeholder="Tentang apa yang ingin Anda tanyakan?"
                                />
                                {errors.subject && (
                                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.subject}</span>
                                    </div>
                                )}
                            </div>

                            {/* Message Field */}
                            <div>
                                <label className="block text-gray-300 mb-2 font-medium">
                                    Pesan
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={5}
                                    className={`w-full bg-white/10 border ${
                                        errors.message
                                            ? "border-rose-500/50"
                                            : "border-white/20"
                                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none`}
                                    placeholder="Tulis pesan Anda di sini..."
                                />
                                {errors.message && (
                                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.message}</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 group flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <Send className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    Kirim Pesan
                                </button>

                                <a
                                    href={createMessageCircleLink()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                    onClick={e => {
                                        if (
                                            !formData.name ||
                                            !formData.message
                                        ) {
                                            e.preventDefault();
                                            alert(
                                                "Harap isi nama dan pesan terlebih dahulu"
                                            );
                                        }
                                    }}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    MessageCircle
                                </a>

                                <a
                                    href={createEmailLink()}
                                    className="flex-1 group flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                    onClick={e => {
                                        if (
                                            !formData.email ||
                                            !formData.message
                                        ) {
                                            e.preventDefault();
                                            alert(
                                                "Harap isi email dan pesan terlebih dahulu"
                                            );
                                        }
                                    }}
                                >
                                    <Mail className="w-5 h-5" />
                                    Email
                                </a>
                            </div>
                        </form>

                        {/* Note */}
                        <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                            <p className="text-sm text-gray-300">
                                <span className="text-blue-300 font-medium">
                                    Catatan:
                                </span>{" "}
                                Untuk pengiriman melalui MessageCircle atau Email,
                                pastikan Anda telah mengisi form di atas
                                terlebih dahulu.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
