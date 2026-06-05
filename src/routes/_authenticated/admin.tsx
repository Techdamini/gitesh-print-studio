import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, Inbox, ShoppingBag, Shield, Loader2, Mail, Phone, Trash2 } from "lucide-react";

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  product_type: string | null;
  quantity: string | null;
  message: string;
  status: string;
  created_at: string;
};

type Order = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  product: string;
  size: string | null;
  quantity: string | null;
  notes: string | null;
  status: string;
  created_at: string;
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Gitesh Enterprises" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"enquiries" | "orders">("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id);
      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (admin) await refresh();
      setLoading(false);
    })();
  }, []);

  async function refresh() {
    const [{ data: e }, { data: o }] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("*").order("created_at", { ascending: false }),
    ]);
    setEnquiries((e as Enquiry[]) ?? []);
    setOrders((o as Order[]) ?? []);
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  async function deleteEnquiry(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    await supabase.from("enquiries").delete().eq("id", id);
    refresh();
  }
  async function deleteOrder(id: string) {
    if (!confirm("Delete this order?")) return;
    await supabase.from("orders").delete().eq("id", id);
    refresh();
  }
  async function setEnquiryStatus(id: string, status: string) {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    refresh();
  }
  async function setOrderStatus(id: string, status: string) {
    await supabase.from("orders").update({ status }).eq("id", id);
    refresh();
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Shield className="mx-auto h-12 w-12 text-gold" />
        <h1 className="mt-6 font-display text-4xl">Admin access required</h1>
        <p className="mt-3 text-muted-foreground">
          You&rsquo;re signed in, but this account doesn&rsquo;t have admin privileges. Ask the developer to add an &lsquo;admin&rsquo; role
          for your user in the <span className="font-semibold">user_roles</span> table.
        </p>
        <button
          onClick={signOut}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Admin</span>
            <h1 className="font-display text-3xl">Dashboard</h1>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <StatCard label="Total enquiries" value={enquiries.length} icon={<Inbox className="h-5 w-5" />} />
          <StatCard label="Total orders" value={orders.length} icon={<ShoppingBag className="h-5 w-5" />} />
        </div>

        <div className="inline-flex rounded-full border border-border bg-background p-1">
          <TabBtn active={tab === "enquiries"} onClick={() => setTab("enquiries")}>
            Enquiries ({enquiries.length})
          </TabBtn>
          <TabBtn active={tab === "orders"} onClick={() => setTab("orders")}>
            Orders ({orders.length})
          </TabBtn>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
          {tab === "enquiries" ? (
            enquiries.length === 0 ? (
              <Empty label="No enquiries yet" />
            ) : (
              <div className="divide-y divide-border">
                {enquiries.map((e) => (
                  <div key={e.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-lg">{e.name}</span>
                        <StatusPill status={e.status} />
                        <span className="text-xs text-muted-foreground">
                          {new Date(e.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{e.phone}</span>
                        {e.email && <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{e.email}</span>}
                        {e.product_type && <span>Product: <b className="text-foreground">{e.product_type}</b></span>}
                        {e.quantity && <span>Qty: <b className="text-foreground">{e.quantity}</b></span>}
                      </div>
                      <p className="mt-2 whitespace-pre-line text-sm">{e.message}</p>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={e.status}
                        onChange={(ev) => setEnquiryStatus(e.id, ev.target.value)}
                        className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button
                        onClick={() => deleteEnquiry(e.id)}
                        className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : orders.length === 0 ? (
            <Empty label="No orders yet" />
          ) : (
            <div className="divide-y divide-border">
              {orders.map((o) => (
                <div key={o.id} className="grid gap-3 p-5 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg">{o.customer_name}</span>
                      <StatusPill status={o.status} />
                      <span className="text-xs text-muted-foreground">
                        {new Date(o.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{o.phone}</span>
                      {o.email && <span className="inline-flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{o.email}</span>}
                      <span>Product: <b className="text-foreground">{o.product}</b></span>
                      {o.size && <span>Size: <b className="text-foreground">{o.size}</b></span>}
                      {o.quantity && <span>Qty: <b className="text-foreground">{o.quantity}</b></span>}
                    </div>
                    {o.notes && <p className="mt-2 whitespace-pre-line text-sm">{o.notes}</p>}
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={o.status}
                      onChange={(ev) => setOrderStatus(o.id, ev.target.value)}
                      className="rounded-md border border-border bg-background px-2 py-1.5 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="in_production">In production</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => deleteOrder(o.id)}
                      className="rounded-md border border-border p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-border bg-background p-5 shadow-soft">
      <div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-3xl">{value}</div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">{icon}</div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${active ? "bg-ink text-white shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
    >
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-amber-100 text-amber-800",
    closed: "bg-zinc-100 text-zinc-700",
    pending: "bg-blue-100 text-blue-800",
    confirmed: "bg-amber-100 text-amber-800",
    in_production: "bg-purple-100 text-purple-800",
    completed: "bg-emerald-100 text-emerald-800",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

function Empty({ label }: { label: string }) {
  return <div className="p-12 text-center text-sm text-muted-foreground">{label}</div>;
}
