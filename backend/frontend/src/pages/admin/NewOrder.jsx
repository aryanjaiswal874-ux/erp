import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Trash2, 
  Check, 
  FileText, 
  Plus, 
  Minus, 
  Sparkles,
  Search,
  User as UserIcon,
  Receipt
} from "lucide-react";
import { useToast } from "../../context/ToastContext";
import DashboardLoader from "../../components/layout/DashboardLoader";
import ClinicBillModal from "./ClinicBillModal";

const NewOrder = () => {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [patientName, setPatientName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showBillPreview, setShowBillPreview] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [catRes, prodRes, userRes] = await Promise.all([
        API.get("/products/groups/all"),
        API.get("/products"),
        API.get("/users").catch(() => ({ data: [] })) // Fallback if user access is restricted
      ]);
      setCategories(catRes.data);
      setProducts(prodRes.data);
      setUsers(userRes.data || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load required data");
      setLoading(false);
    }
  };

  // Filter products by selected category and search query
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === "all" || String(prod.serviceGroupId) === String(selectedCategory);
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Cart operations
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.title} added to bill`);
  };

  const updateQuantity = (productId, amount) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + amount;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.success("Item removed from bill");
  };

  // Calculate live total cost
  const totalCost = cart.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    return total + (price * item.quantity);
  }, 0);

  // Submit Order flow
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      toast.error("Please add at least one treatment to the bill");
      return;
    }

    setSubmitting(true);
    try {
      // Placing orders sequentially or in parallel
      const orderPromises = cart.map(item => {
        const payload = {
          productId: item.id,
          quantity: item.quantity,
          amount: parseFloat(item.price) * item.quantity
        };
        // If an admin selected a target user/patient
        if (selectedUser) {
          payload.userId = selectedUser;
        }
        return API.post("/orders", payload);
      });

      await Promise.all(orderPromises);
      toast.success("Bill / Order generated successfully!");
      setCart([]);
      navigate("/admin/orders");
    } catch (error) {
      console.error(error);
      toast.error("Error creating bill: " + (error.response?.data?.message || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <DashboardLoader loading={true} title="Preparing Treatment billing" />;

  return (
    <>
    <div className="space-y-6 font-sans pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 border border-slate-100 rounded-2xl shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate("/admin/orders")} 
            className="p-2 hover:bg-slate-50 text-slate-600 rounded-xl transition-colors border border-slate-100"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-violet-500" size={20} /> Create New Bill
            </h1>
            <p className="text-xs text-slate-500 mt-1">Select treatments to generate instant bill / order</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selection Area (Left & Center) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Search and Categories bar */}
          <div className="bg-white p-6 border border-slate-100 rounded-2xl shadow-sm space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-slate-400" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search treatments or procedures..."
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2.5">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                    selectedCategory === "all"
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  All Treatments
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                      selectedCategory === cat.id
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                        : "bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProducts.map((prod) => {
              const inCart = cart.find(item => item.id === prod.id);
              return (
                <div 
                  key={prod.id} 
                  className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden ${
                    inCart ? "border-violet-500/50 ring-1 ring-violet-500/10" : "border-slate-100"
                  }`}
                >
                  {inCart && (
                    <div className="absolute top-0 right-0 bg-violet-500 text-white px-3 py-1 text-[9px] font-black rounded-bl-xl uppercase tracking-widest flex items-center gap-1 shadow-sm">
                      <Check size={10} /> Selected
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 rounded text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        {prod.ServiceGroup?.name || "Treatment"}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-violet-600 transition-colors pr-10">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {prod.description || "No description available."}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Cost</div>
                      <div className="text-base font-black text-slate-900 mt-0.5">₹{parseFloat(prod.price).toLocaleString()}</div>
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                        inCart 
                          ? "bg-violet-50 text-violet-600 hover:bg-violet-100 border border-violet-100" 
                          : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
                      }`}
                    >
                      <Plus size={14} /> Add item
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full bg-white p-12 border border-slate-100 rounded-2xl shadow-sm text-center">
                <FileText className="mx-auto text-slate-300 mb-3" size={40} />
                <h3 className="font-bold text-slate-800 text-sm">No treatments found</h3>
                <p className="text-xs text-slate-500 mt-1">Try resetting the filter or changing your search keyword.</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart / Invoice Summary (Right side) */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-lg overflow-hidden flex flex-col sticky top-6">
            
            {/* Header */}
            <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart size={20} className="text-violet-400" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Billing Cart</h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">{cart.length} item(s) selected</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Optional User Assignment */}
              {users.length > 0 && (
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                    Assign Patient / Customer (Optional)
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-3 text-slate-400" size={16} />
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                    >
                      <option value="">Guest Patient</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>
                          {u.full_name} ({u.email || u.mobile})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Running Cart List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-800 truncate">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5">₹{parseFloat(item.price).toLocaleString()} each</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 bg-white rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-50 text-slate-500"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-50 text-slate-500"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl">
                    <ShoppingCart className="mx-auto text-slate-300 mb-2" size={32} />
                    <p className="text-xs font-bold text-slate-400">Cart is empty</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Add treatments from the left panel</p>
                  </div>
                )}
              </div>

              {/* Total Summary */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{totalCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Tax & Levies</span>
                  <span className="text-slate-400">₹0.00</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-sm font-black text-slate-800">Total Bill Cost</span>
                  <span className="text-lg font-black text-slate-900">₹{totalCost.toLocaleString()}</span>
                </div>
              </div>

              {/* Patient Name input */}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name..."
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200 transition-all"
                />
              </div>

              {/* Generate Bill Preview */}
              <button
                disabled={cart.length === 0}
                onClick={() => setShowBillPreview(true)}
                className="w-full py-3 bg-[#7B1010] hover:bg-[#5e0c0c] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Receipt size={14} /> Generate Bill / Preview
              </button>

              {/* Place Order in System */}
              <button
                disabled={submitting || cart.length === 0}
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Saving..." : "Save Order to System"}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Clinic Bill Preview Modal */}
    {showBillPreview && (
      <ClinicBillModal
        cart={cart}
        total={totalCost}
        patientName={patientName}
        onClose={() => setShowBillPreview(false)}
      />
    )}
    </>  
  );
};

export default NewOrder;
