import React, { useState, useEffect, useRef } from "react";
import API from "../../api/axios";
import {
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  Youtube,
  Shield,
  HelpCircle,
  Save,
  Search,
  Upload,
  Image as ImageIcon,
  X,
  Boxes,
  Loader2,
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../context/AuthContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import DataTable from "../../components/shared/DataTable";

const ProductManagement = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isSuperAdmin = user?.role === "super_admin";
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fileInputRef = useRef(null);

  const [currentProduct, setCurrentProduct] = useState({
    title: "",
    description: "",
    price: 0,
    offer_price: "",
    eligibility: "",
    documents_required: [],
    education_content: "",
    youtube_links: [],
    is_active: true,
    serviceGroupId: "",
    productTypeId: "",
    image: "",
  });

  const [serviceGroups, setServiceGroups] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [availableDocTypes, setAvailableDocTypes] = useState([]);
  const [newYoutubeLink, setNewYoutubeLink] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Filter State
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");

  // Derived State: Filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterCategory === "All" || String(product.serviceGroupId) === String(filterCategory);
    const matchesType =
      filterType === "All" || String(product.productTypeId) === String(filterType);
    return matchesCategory && matchesType;
  });

  useEffect(() => {
    fetchProducts();
    fetchMetadata();
  }, []);

  const fetchProducts = async () => {
    try {
      const prodRes = await API.get("/products");
      setProducts(prodRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchMetadata = async () => {
    try {
      const [groups, types, docs] = await Promise.all([
        API.get("/products/groups/all"),
        API.get("/products/types/all"),
        API.get("/documents/types"),
      ]);
      setServiceGroups(groups.data);
      setProductTypes(types.data);
      setAvailableDocTypes(docs.data);
    } catch (error) {
      console.error(error);
    }
  };

  const productColumns = [
    {
      header: 'Product',
      key: 'title',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-50 border border-slate-200 p-0.5">
            {row.image ? (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL_IMG}${row.image}`}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100">
                <Boxes size={16} className="text-slate-300" />
              </div>
            )}
          </div>
          <div>
            <div className="font-bold text-slate-800">{row.title}</div>
            <div className="text-[10px] text-slate-400 font-medium">#{row.id.substring(0, 8).toUpperCase()}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Category / Type',
      key: 'productTypeId',
      sortable: true,
      render: (row) => (
        <div>
          <div className="text-xs font-bold text-slate-700">{row.ProductType?.name || row.product_type || "-"}</div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{row.ServiceGroup?.name || row.category || "-"}</div>
        </div>
      )
    },
    {
      header: 'Pricing',
      key: 'price',
      sortable: true,
      render: (row) => (
        <div className="space-y-0.5">
          <div className="font-bold text-slate-900">₹{parseFloat(row.price).toLocaleString()}</div>
          {row.offer_price && (
            <div className="text-[10px] text-emerald-600 font-bold">Offer: ₹{parseFloat(row.offer_price).toLocaleString()}</div>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      key: 'is_active',
      render: (row) => (
        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${row.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
          {row.is_active ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-left',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setEditMode(true);
              setCurrentProduct(row);
              setPreviewUrl(row.image ? `${import.meta.env.VITE_API_BASE_URL_IMG}${row.image}` : "");
              setShowModal(true);
            }}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          {isSuperAdmin && (
            <button
              onClick={() => handleDelete(row.id)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )
    }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();

      Object.keys(currentProduct).forEach((key) => {
        if (key === "documents_required" || key === "youtube_links") {
          formData.append(key, JSON.stringify(currentProduct[key]));
        } else if (
          currentProduct[key] !== null &&
          currentProduct[key] !== undefined
        ) {
          formData.append(key, currentProduct[key]);
        }
      });

      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (editMode) {
        await API.put(`/products/${currentProduct.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setShowModal(false);
      fetchProducts();
      resetForm();
      toast.success(`Product ${editMode ? "updated" : "created"} successfully`);
    } catch (error) {
      toast.error(
        "Error saving: " + (error.response?.data?.message || error.message),
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      title: "",
      description: "",
      price: 0,
      offer_price: "",
      eligibility: "",
      documents_required: [],
      education_content: "",
      youtube_links: [],
      is_active: true,
      serviceGroupId: "",
      productTypeId: "",
      image: "",
    });
    setNewYoutubeLink("");
    setSelectedFile(null);
    setPreviewUrl("");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const handleDocToggle = (docName) => {
    const current = [...(currentProduct.documents_required || [])];
    if (current.includes(docName)) {
      setCurrentProduct({
        ...currentProduct,
        documents_required: current.filter((d) => d !== docName),
      });
    } else {
      setCurrentProduct({
        ...currentProduct,
        documents_required: [...current, docName],
      });
    }
  };

  const addYoutubeLink = () => {
    if (!newYoutubeLink.trim()) return;
    setCurrentProduct({
      ...currentProduct,
      youtube_links: [...(currentProduct.youtube_links || []), newYoutubeLink],
    });
    setNewYoutubeLink("");
  };

  const removeYoutubeLink = (index) => {
    const filtered = currentProduct.youtube_links.filter((_, i) => i !== index);
    setCurrentProduct({ ...currentProduct, youtube_links: filtered });
  };

  if (loading) return <DashboardLoader loading={true} title="Loading Products" />;

  return (
    <div className="space-y-6 pb-20 font-sans">
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 border border-slate-200 rounded-xl shadow-sm gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Products</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">Manage products, pricing, and requirements.</p>
        </div>
        <button
          onClick={() => {
            setEditMode(false);
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all rounded-lg shadow-md"
        >
          <Plus size={14} /> New Product
        </button>
      </div>

      <DataTable
        columns={productColumns}
        data={filteredProducts}
        fileName="Service_Catalog"
        pageSize={10}
        actions={
          <div className="flex items-center gap-2 mr-2">
            <select
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                setFilterType("All");
              }}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-tight outline-none bg-white text-slate-600 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {serviceGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold uppercase tracking-tight outline-none bg-white text-slate-600 cursor-pointer"
            >
              <option value="All">All Types</option>
              {productTypes
                .filter(t => filterCategory === "All" || String(t.serviceGroupId) === String(filterCategory))
                .map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        }
      />

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-slate-900/5">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                {editMode ? <Edit size={16} /> : <Plus size={16} />}
                {editMode ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all p-2"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/30"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Side - Core Details */}
                <div className="lg:col-span-2 space-y-5">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                        Product Name
                      </label>
                      <input
                        required
                        type="text"
                        value={currentProduct.title}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            title: e.target.value,
                          })
                        }
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 outline-none transition-all font-medium bg-white"
                        placeholder="Enter product title"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                          Category
                        </label>
                        <select
                          required
                          value={currentProduct.serviceGroupId}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              serviceGroupId: e.target.value,
                              productTypeId: "",
                            })
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none bg-white font-bold text-slate-700"
                        >
                          <option value="">Select Category</option>
                          {serviceGroups.map((g) => (
                            <option key={g.id} value={g.id}>
                              {g.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                          Product Type
                        </label>
                        <select
                          value={currentProduct.productTypeId}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              productTypeId: e.target.value,
                            })
                          }
                          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none bg-white font-bold text-slate-700"
                        >
                          <option value="">Select Type</option>
                          {productTypes
                            .filter(
                              (t) =>
                                String(t.serviceGroupId).toLowerCase() ===
                                String(currentProduct.serviceGroupId).toLowerCase(),
                            )
                            .map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                          Regular Price
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">
                            ₹
                          </span>
                          <input
                            required
                            type="number"
                            value={currentProduct.price}
                            onChange={(e) =>
                              setCurrentProduct({
                                ...currentProduct,
                                price: e.target.value,
                              })
                            }
                            className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:border-indigo-500 outline-none font-bold text-slate-900 bg-white"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                          Offer Price (Optional)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">
                            ₹
                          </span>
                          <input
                            type="number"
                            value={currentProduct.offer_price}
                            onChange={(e) =>
                              setCurrentProduct({
                                ...currentProduct,
                                offer_price: e.target.value,
                              })
                            }
                            className="w-full border border-slate-200 rounded-lg pl-7 pr-3 py-2 text-sm focus:border-indigo-500 outline-none font-bold text-slate-900 bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                      Eligibility Criteria
                    </label>
                    <textarea
                      rows="2"
                      value={currentProduct.eligibility}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          eligibility: e.target.value,
                        })
                      }
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none font-medium bg-white"
                      placeholder="Who can apply?"
                    ></textarea>
                  </div>

                  {/* Documents Section - Compact Grid */}
                  <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-2">
                      Documents Required
                    </label>

                    <div className="grid grid-cols-2 gap-4 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar">
                      {/* Group available docs by category */}
                      {Object.entries(
                        availableDocTypes.reduce((acc, doc) => {
                          const cat = doc.category || "General";
                          if (!acc[cat]) acc[cat] = [];
                          acc[cat].push(doc);
                          return acc;
                        }, {}),
                      ).map(([category, docs]) => (
                        <div key={category} className="break-inside-avoid">
                          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-1">
                            {category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {docs.map((doc) => {
                              const isSelected = (
                                currentProduct.documents_required || []
                              ).includes(doc.name);
                              return (
                                <button
                                  key={doc.id}
                                  type="button"
                                  onClick={() => handleDocToggle(doc.name)}
                                  className={`px-2.5 py-1.5 rounded-md text-[10px] font-bold transition-all border flex items-center gap-1.5 ${isSelected
                                    ? "bg-slate-800 border-slate-800 text-white shadow-sm ring-2 ring-slate-100"
                                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                                    }`}
                                >
                                  {isSelected ? (
                                    <CheckCircle
                                      size={10}
                                      className="text-emerald-400"
                                    />
                                  ) : (
                                    <div className="w-2.5 h-2.5 rounded-full border border-slate-300"></div>
                                  )}
                                  {doc.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side - Image & Extras */}
                <div className="space-y-6">
                  <div className="border border-slate-200 rounded-xl p-4 text-center bg-white">
                    <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">
                      Product Image
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-video w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 hover:border-slate-300 transition-all overflow-hidden relative group"
                    >
                      {previewUrl ? (
                        <>
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-contain p-2"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white text-xs font-bold uppercase tracking-wider">
                              Change Image
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-slate-500">
                          <ImageIcon size={28} strokeWidth={1.5} />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            Click to Upload
                          </span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                        Description Content
                      </label>
                      <textarea
                        rows="8"
                        value={currentProduct.education_content}
                        onChange={(e) =>
                          setCurrentProduct({
                            ...currentProduct,
                            education_content: e.target.value,
                          })
                        }
                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none font-medium custom-scrollbar bg-white"
                        placeholder="Detailed content..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">
                        YouTube Links
                      </label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={newYoutubeLink}
                          onChange={(e) => setNewYoutubeLink(e.target.value)}
                          placeholder="Paste URL..."
                          className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:border-indigo-500 outline-none font-medium bg-white"
                        />
                        <button
                          type="button"
                          onClick={addYoutubeLink}
                          className="bg-slate-800 text-white px-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-1.5 max-h-[80px] overflow-y-auto custom-scrollbar">
                        {(currentProduct.youtube_links || []).map(
                          (link, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center bg-white border border-slate-200 px-3 py-2 rounded-lg shadow-sm"
                            >
                              <div className="flex items-center gap-2 overflow-hidden">
                                <Youtube
                                  size={12}
                                  className="text-red-500 shrink-0"
                                />
                                <span className="text-[10px] font-medium text-slate-600 truncate max-w-[150px]">
                                  {link}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeYoutubeLink(idx)}
                                className="text-slate-400 hover:text-rose-500 transition-colors"
                              >
                                <X size={14} />
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 transition-colors">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={currentProduct.is_active}
                          onChange={(e) =>
                            setCurrentProduct({
                              ...currentProduct,
                              is_active: e.target.checked,
                            })
                          }
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Active Status
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 flex justify-end gap-3 mt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 border border-slate-200 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-800 shadow-md hover:shadow-lg flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {submitting ? "Processing..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
