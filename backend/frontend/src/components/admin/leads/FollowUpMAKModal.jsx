import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    X,
    Send,
    Mic,
    Paperclip,
    Phone,
    Video,
    Mail,
    MessageSquare,
    Play,
    Pause,
    Trash2,
    MicOff,
    Loader2,
    Plus,
    CheckSquare,
    BarChart2,
    Calendar,
    Clock,
    User,
    Headphones,
    CreditCard,
    Volume2,
} from "lucide-react";
import { addFollowUp, updateLead } from "../../../api/makLeadService";

const FollowUpMAKModal = ({ lead, onClose, onSuccess }) => {
    const navigate = useNavigate();
    const [history, setHistory] = useState(lead.MAKLeadHistories || []);
    const [remark, setRemark] = useState("");
    const [type, setType] = useState("Call");
    const [status, setStatus] = useState(lead.status);
    const [attachments, setAttachments] = useState([]);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioPreviewUrl, setAudioPreviewUrl] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Waveform/Amplitude states
    const [amplitude, setAmplitude] = useState(0);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameRef = useRef(null);

    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const fileInputRef = useRef(null);
    const recognitionRef = useRef(null);

    const typeOptions = [
        { label: "Call", color: "bg-blue-50 text-blue-600 border-blue-200" },
        { label: "Whatsapp", color: "bg-green-50 text-green-600 border-green-200" },
        { label: "Email", color: "bg-amber-50 text-amber-600 border-amber-200" },
        {
            label: "Walkin",
            color: "bg-purple-50 text-purple-600 border-purple-200",
        },
        { label: "Google Meeting", color: "bg-red-50 text-red-600 border-red-200" },
    ];

    const statusOptions = [
        {
            label: "Interested",
            color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        },
        {
            label: "Not Interested",
            color: "bg-rose-50 text-rose-700 border-rose-200",
        },
        {
            label: "May be Interested",
            color: "bg-amber-50 text-amber-700 border-amber-200",
        },
    ];

    const rowColors = [
        "bg-blue-50/20",
        "bg-emerald-50/20",
        "bg-purple-50/20",
        "bg-amber-50/20",
        "bg-rose-50/20",
    ];

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = "en-US";

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal)
                        finalTranscript += event.results[i][0].transcript;
                }
                if (finalTranscript)
                    setRemark((prev) => (prev ? prev + " " : "") + finalTranscript);
            };

            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => setIsListening(false);
        }

        return () => {
            if (animationFrameRef.current)
                cancelAnimationFrame(animationFrameRef.current);
            if (audioContextRef.current && audioContextRef.current.state !== "closed")
                audioContextRef.current.close();
        };
    }, []);

    const startVisualizer = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            if (
                !audioContextRef.current ||
                audioContextRef.current.state === "closed"
            ) {
                audioContextRef.current = new (
                    window.AudioContext || window.webkitAudioContext
                )();
            }
            analyserRef.current = audioContextRef.current.createAnalyser();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            source.connect(analyserRef.current);
            analyserRef.current.fftSize = 256;
            const bufferLength = analyserRef.current.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);

            const draw = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArrayRef.current[i];
                }
                const average = sum / bufferLength;
                setAmplitude(average);
                animationFrameRef.current = requestAnimationFrame(draw);
            };
            draw();
            return stream;
        } catch (err) {
            console.error("Mic access denied for visualizer", err);
            return null;
        }
    };

    const stopVisualizer = () => {
        if (animationFrameRef.current)
            cancelAnimationFrame(animationFrameRef.current);
        if (audioContextRef.current && audioContextRef.current.state !== "closed") {
            audioContextRef.current.close();
        }
        setAmplitude(0);
    };

    const toggleListening = async () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
            stopVisualizer();
            setIsListening(false);
        } else {
            const stream = await startVisualizer();
            if (stream) {
                recognitionRef.current.start();
                setIsListening(true);
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files) setAttachments(Array.from(e.target.files));
    };

    const startRecording = async () => {
        try {
            const stream = await startVisualizer();
            if (!stream) return;
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = []; // Reset chunks

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                setAudioBlob(blob);
                setAudioPreviewUrl(URL.createObjectURL(blob));
                stopVisualizer();
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            alert("Microphone access denied.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream
                .getTracks()
                .forEach((track) => track.stop());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isListening) toggleListening();

        let finalAudioBlob = audioBlob;
        if (isRecording && mediaRecorderRef.current) {
            finalAudioBlob = await new Promise((resolve) => {
                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                    setAudioBlob(blob);
                    setAudioPreviewUrl(URL.createObjectURL(blob));
                    stopVisualizer();
                    resolve(blob);
                };
                mediaRecorderRef.current.stop();
                setIsRecording(false);
                mediaRecorderRef.current.stream
                    .getTracks()
                    .forEach((track) => track.stop());
            });
        }

        setSubmitting(true);
        const formData = new FormData();
        formData.append("remark", remark);
        formData.append("type", type);
        formData.append("status", status);
        attachments.forEach((file) => formData.append("attachments", file));
        if (finalAudioBlob)
            formData.append("audio", finalAudioBlob, "recording.webm");

        try {
            const { data } = await addFollowUp(lead.id, formData);
            setHistory((prev) => [data.history, ...prev]);
            setRemark("");
            setAttachments([]);
            setAudioBlob(null);
            setAudioPreviewUrl(null);
            onSuccess();
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const baseURL =
        import.meta.env.VITE_API_BASE_URL_IMG || "http://localhost:5000";

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[2px]">
            <div className="bg-white rounded-lg border border-slate-200 shadow-2xl w-full max-w-7xl h-[92vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-3 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold text-slate-800 leading-none">
                                {lead.name}
                            </h2>
                            <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
                                Lead engagement history (MAK)
                            </span>
                        </div>
                        <div className="h-6 w-px bg-slate-100 mx-2"></div>
                        <div className="flex items-center gap-4">
                            <span className="text-[11px] text-blue-600 font-black flex items-center gap-1.5 bg-blue-50/50 px-2.5 py-1 rounded border border-blue-100">
                                <Phone size={11} /> {lead.contact}
                            </span>
                            <div className="flex flex-col">
                                <span className="text-[8px] text-slate-400 font-black uppercase tracking-wider mb-0.5 ml-1">
                                    Current status
                                </span>
                                <span
                                    className={`text-[10px] font-bold px-3 py-0.5 rounded-full border ${statusOptions.find((o) => o.label === status)?.color || "bg-slate-50 text-slate-500"}`}
                                >
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-50 text-slate-400 rounded transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                    {/* Activity Feed */}
                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
                        <div className="flex items-center justify-between mb-5">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                    <BarChart2 size={12} className="text-blue-600" />
                                </div>
                                <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-widest italic">
                                    Follow-ups log
                                </h3>
                            </div>
                            <div className="text-[10px] font-black text-blue-600 bg-white border border-blue-100 px-4 py-1 rounded-full shadow-sm">
                                {history.length} logs found
                            </div>
                        </div>

                        <div className="space-y-4">
                            {history.length === 0 && (
                                <div className="text-center py-24 bg-white border border-dashed border-slate-200 rounded-lg">
                                    <MessageSquare
                                        size={32}
                                        className="mx-auto text-slate-100 mb-3"
                                    />
                                    <p className="text-slate-300 text-[11px] font-bold uppercase tracking-widest">
                                        No interaction history
                                    </p>
                                </div>
                            )}
                            {history.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className={`${rowColors[idx % rowColors.length]} p-4 rounded-xl border border-slate-100/50 shadow-sm transition-all hover:shadow-md hover:bg-white`}
                                >
                                    <div className="flex gap-5">
                                        <div className="w-28 border-r border-slate-200/50 pr-5 shrink-0">
                                            <div className="flex flex-col gap-2">
                                                <span
                                                    className={`w-fit px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter border-2 ${typeOptions.find((o) => o.label === item.type)?.color || "bg-white text-slate-400 border-slate-100"}`}
                                                >
                                                    {item.type}
                                                </span>
                                                <div className="flex flex-col gap-1">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-black text-slate-600">
                                                        <Calendar size={11} className="text-blue-500" />{" "}
                                                        {new Date(item.createdAt).toLocaleDateString(
                                                            "en-IN",
                                                            { day: "2-digit", month: "short" },
                                                        )}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 ml-0.5">
                                                        <Clock size={11} />{" "}
                                                        {new Date(item.createdAt).toLocaleTimeString([], {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] text-slate-700 font-medium leading-relaxed mb-4 italic">
                                                "{item.remark}"
                                            </p>

                                            <div className="flex flex-col gap-3">
                                                {item.audioRecording && (
                                                    <div className="flex items-center gap-3 bg-white/80 p-2 rounded-lg border border-slate-200 w-fit shadow-inner">
                                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                            <Volume2 size={14} />
                                                        </div>
                                                        <audio
                                                            src={`${baseURL}${item.audioRecording}`}
                                                            controls
                                                            className="h-7 w-48 lg:w-64 opacity-80"
                                                        />
                                                    </div>
                                                )}

                                                {item.attachments?.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.attachments.map((att, i) => (
                                                            <a
                                                                key={i}
                                                                href={`${baseURL}${att}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md text-[9px] font-bold text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all shadow-sm"
                                                            >
                                                                <Paperclip
                                                                    size={11}
                                                                    className="text-blue-400"
                                                                />{" "}
                                                                Attached document {i + 1}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="w-44 flex flex-col items-end gap-2 border-l border-slate-200/50 pl-5 shrink-0">
                                            <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">
                                                Authenticated by
                                            </span>
                                            <div className="flex items-center gap-2.5 bg-white p-2 pr-4 rounded-lg border border-slate-100 shadow-sm">
                                                <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden shrink-0">
                                                    {item.Actor?.profile_photo ? (
                                                        <img
                                                            src={
                                                                item.Actor.profile_photo.startsWith("http")
                                                                    ? item.Actor.profile_photo
                                                                    : `${baseURL}${item.Actor.profile_photo}`
                                                            }
                                                            className="w-full h-full object-cover"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <User
                                                            size={14}
                                                            className="text-slate-300 w-full h-full p-1"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-col text-left">
                                                    <span className="text-[11px] font-black text-slate-800 leading-none">
                                                        {item.Actor?.full_name}
                                                    </span>
                                                    <span className="text-[8px] text-blue-500 font-bold uppercase tracking-wider mt-1">
                                                        Authorized
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Panel */}
                    <div className="w-full md:w-[420px] bg-white border-l border-slate-100 p-6 flex flex-col space-y-7 overflow-y-auto">
                        {/* <section>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <Plus size={12} className="text-blue-500" /> Channel connect
              </h4>
              <div className="flex gap-2">
                <a
                  href={`tel:${lead.contact}`}
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded bg-blue-50/50 border border-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white transition-all group"
                >
                  <Phone
                    size={12}
                    className="group-hover:scale-110 transition-transform"
                  />{" "}
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    Call
                  </span>
                </a>
                <a
                  href={
                    (() => {
                      let num = lead.whatsapp || lead.contact;
                      if (num) {
                        num = num.replace(/\D/g, '');
                        if (num.length === 10) num = '91' + num;
                        return `https://wa.me/${num}`;
                      }
                      return '#';
                    })()
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded bg-emerald-50/50 border border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all group"
                >
                  <svg
                    className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>{" "}
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    WhatsApp
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigate("/admin/communication", {
                      state: { email: lead.email },
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 rounded bg-amber-50/50 border border-amber-100 text-amber-600 hover:bg-amber-600 hover:text-white transition-all group cursor-pointer"
                >
                  <Mail
                    size={12}
                    className="group-hover:scale-110 transition-transform"
                  />{" "}
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    Email
                  </span>
                </button>
              </div>
            </section> */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex-1 flex flex-col space-y-6"
                        >
                            <section>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block italic">
                                    Interaction type
                                </label>
                                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                    {typeOptions.map((opt) => (
                                        <button
                                            key={opt.label}
                                            type="button"
                                            onClick={() => setType(opt.label)}
                                            className={`py-1.5 px-3 rounded text-[9px] font-black border transition-all whitespace-nowrap ${type === opt.label ? "bg-blue-600 border-blue-600 text-white shadow-md" : "bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-300"}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 block italic">
                                    Lead disposition
                                </label>
                                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                                    {statusOptions.map((opt) => (
                                        <button
                                            key={opt.label}
                                            type="button"
                                            onClick={() => setStatus(opt.label)}
                                            className={`py-1.5 px-4 rounded text-[9px] font-black border transition-all whitespace-nowrap ${status === opt.label ? opt.color + " shadow-md" : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <section className="flex-1 flex flex-col min-h-0">
                                <div className="flex justify-between items-center mb-3">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                                        Conversation summary
                                    </label>
                                    <button
                                        type="button"
                                        onClick={toggleListening}
                                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[9px] font-black transition-all ${isListening ? "bg-red-500 border-red-600 text-white animate-pulse" : "bg-white border-blue-200 text-blue-600 hover:bg-blue-50"}`}
                                    >
                                        <Mic size={10} />{" "}
                                        {isListening ? "Listening..." : "Voice typing"}
                                    </button>
                                </div>
                                <textarea
                                    className="w-full flex-1 min-h-[120px] p-4 text-[12px] bg-slate-50/50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:border-blue-300 focus:ring-0 transition-all resize-none font-bold text-slate-700 leading-relaxed shadow-inner"
                                    placeholder="Write exactly what happened during this call..."
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    required
                                ></textarea>
                            </section>

                            <section className="p-4 bg-slate-50/80 rounded-xl border border-slate-100 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
                                            Call Recording
                                        </span>
                                        {audioPreviewUrl && (
                                            <span className="text-[9px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                                                <CheckSquare size={10} /> Recorded successfully
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        {audioPreviewUrl && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const audio = new Audio(audioPreviewUrl);
                                                    audio.play();
                                                }}
                                                className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-all shadow-sm"
                                                title="Preview audio"
                                            >
                                                <Play size={12} fill="currentColor" />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={isRecording ? stopRecording : startRecording}
                                            className={`px-3 py-1.5 rounded flex items-center gap-1.5 text-[9px] font-black border transition-all ${isRecording ? "bg-red-500 border-red-600 text-white animate-pulse shadow-red-200 shadow-lg" : audioBlob ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-white border-slate-200 text-slate-400 hover:border-slate-800"}`}
                                        >
                                            {isRecording ? <MicOff size={12} /> : <Mic size={12} />}
                                            {isRecording
                                                ? "Stop Recording..."
                                                : audioBlob
                                                    ? "Record again"
                                                    : "Record voice"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full py-2 border border-dashed border-slate-300 rounded text-[9px] font-black text-slate-400 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-500 transition-all flex items-center justify-center gap-2"
                                >
                                    <Paperclip size={12} />
                                    {attachments.length > 0
                                        ? `${attachments.length} documents attached`
                                        : "Attach proof / documents"}
                                </button>
                                <input
                                    type="file"
                                    multiple
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            </section>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3 bg-blue-600 text-white rounded font-black text-[11px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-100 disabled:opacity-50 active:scale-95"
                            >
                                {submitting ? (
                                    <Loader2 size={14} className="animate-spin" />
                                ) : (
                                    <Send size={14} />
                                )}
                                Submit Follow-up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FollowUpMAKModal;
