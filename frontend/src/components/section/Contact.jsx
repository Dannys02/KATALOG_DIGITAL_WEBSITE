import React, { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Clock,
    CheckCircle,
    AlertCircle,
    MessageCircle
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

    // 1. Validasi terpusat: Mengembalikan boolean untuk mempermudah pengecekan di fungsi lain
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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Real-time error removal: Menghapus pesan error saat user mulai memperbaiki input
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
    };

    // 2. Handler Utama: Mengatur alur submit dan reset state
    const handleSubmissionFlow = callback => {
        if (validateForm()) {
            setIsSubmitted(true);
            callback(); // Eksekusi buka WA atau Email

            // Auto-reset setelah 3 detik untuk menjaga kebersihan UI
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
            // UX Professional: Scroll otomatis ke input pertama yang error
            const firstErrorField = document.getElementsByName(
                Object.keys(errors)[0]
            )[0];
            if (firstErrorField) firstErrorField.focus();
        }
    };

    // 3. Link Generators: Menggunakan encodeURIComponent secara ketat untuk menghindari karakter ilegal di URL
    const openWhatsApp = e => {
        e.preventDefault();
        handleSubmissionFlow(() => {
            const phoneNumber = "6285645837298";
            const text = `Halo, saya ${formData.name}\nEmail: ${formData.email}\nSubjek: ${formData.subject}\n\nPesan: ${formData.message}`;
            window.open(
                `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`,
                "_blank"
            );
        });
    };

    const openEmail = e => {
        e.preventDefault();
        handleSubmissionFlow(() => {
            const email = "webdannys@gmail.com";
            const mailto = `mailto:${email}?subject=${encodeURIComponent(
                formData.subject
            )}&body=${encodeURIComponent(
                `Nama: ${formData.name}\nEmail: ${formData.email}\nTelepon: ${formData.phone}\n\n${formData.message}`
            )}`;
            window.location.href = mailto;
        });
    };

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: "Telepon",
            info: "+62 856-4583-7298",
            desc: "Senin - Jumat, 09:00 - 18:00"
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: "Email",
            info: "webdannys@gmail.com"
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: "Lokasi",
            info: "Jawa Timur, Indonesia",
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
        <section id="kontak" className="fade-in py-20">
            <div className="container mx-auto px-4">
                {/* Header tetap sama */}
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
                    {/* Bagian Informasi Kontak tetap sama */}
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
                            {isSubmitted && (
                                <div className="mt-8 p-4 bg-gradient-to-r from-emerald-500/20 to-emerald-900/20 rounded-xl border border-emerald-500/30">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <p className="font-medium text-white">
                                                Pesan Diproses!
                                            </p>
                                            <p className="text-sm text-gray-300">
                                                Mengarahkan Anda ke aplikasi
                                                tujuan...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form: Menghapus onSubmit di form karena logika ada di button individu */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <h3 className="text-2xl font-bold text-white mb-8">
                            Kirim Pesan
                        </h3>
                        <form className="space-y-6" noValidate>
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
                                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                                    placeholder="Masukkan nama Anda"
                                />
                                {errors.name && (
                                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.name}</span>
                                    </div>
                                )}
                            </div>

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
                                        } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                                        placeholder="dannys@gmail.com"
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
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                                        placeholder="+62 854..."
                                    />
                                </div>
                            </div>

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
                                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all`}
                                    placeholder="Apa subjek pesan Anda?"
                                />
                                {errors.subject && (
                                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.subject}</span>
                                    </div>
                                )}
                            </div>

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
                                    } rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none`}
                                    placeholder="Tulis pesan Anda..."
                                />
                                {errors.message && (
                                    <div className="flex items-center gap-2 mt-2 text-rose-400 text-sm">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>{errors.message}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                {/* 4. Button Logic: Menggunakan fungsi khusus agar validasi dieksekusi sebelum redirect */}
                                <button
                                    type="button"
                                    onClick={openWhatsApp}
                                    className="flex-1 group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <MessageCircle className="w-5 h-5" />{" "}
                                    WhatsApp
                                </button>

                                <button
                                    type="button"
                                    onClick={openEmail}
                                    className="flex-1 group flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                                >
                                    <Mail className="w-5 h-5" /> Email
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
                            <p className="text-sm text-gray-300">
                                <span className="text-blue-300 font-medium">
                                    Catatan:
                                </span>{" "}
                                Pastikan form diisi dengan benar agar kami dapat
                                memberikan respon yang akurat melalui platform
                                pilihan Anda.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
