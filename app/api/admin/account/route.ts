import { NextResponse } from "next/server";
import { createClient as createServerClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function PATCH(request: Request) {
  try {
    // =========================
    // CEK USER YANG LOGIN
    // =========================
    const supabase = await createServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Anda tidak memiliki akses." },
        { status: 401 }
      );
    }

    // =========================
    // AMBIL BODY
    // =========================
    const body = await request.json();

    const action =
      typeof body.action === "string"
        ? body.action
        : "";

    const newEmail =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    // =========================
    // VALIDASI ACTION
    // =========================
    if (action !== "update-email") {
      return NextResponse.json(
        { error: "Action tidak valid." },
        { status: 400 }
      );
    }

    // =========================
    // VALIDASI EMAIL
    // =========================
    if (!newEmail) {
      return NextResponse.json(
        { error: "Email baru wajib diisi." },
        { status: 400 }
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(newEmail)) {
      return NextResponse.json(
        { error: "Format email tidak valid." },
        { status: 400 }
      );
    }

    if (
      user.email?.toLowerCase() ===
      newEmail
    ) {
      return NextResponse.json(
        {
          error:
            "Email baru masih sama dengan email saat ini.",
        },
        { status: 400 }
      );
    }

    // =========================
    // ENV SERVER
    // =========================
    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Supabase URL atau Service Role Key belum tersedia."
      );

      return NextResponse.json(
        {
          error:
            "Konfigurasi server belum lengkap.",
        },
        { status: 500 }
      );
    }

    // =========================
    // ADMIN CLIENT
    // =========================
    const adminSupabase = createAdminClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // =========================
    // UPDATE EMAIL LANGSUNG
    // =========================
    const { data, error } =
      await adminSupabase.auth.admin.updateUserById(
        user.id,
        {
          email: newEmail,
          email_confirm: true,
        }
      );

    if (error) {
      console.error(
        "Gagal mengubah email admin:",
        error.message
      );

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 400 }
      );
    }

    // =========================
    // BERHASIL
    // =========================
    return NextResponse.json({
      success: true,
      email: data.user.email,
      message:
        "Email admin berhasil diubah.",
    });
  } catch (error) {
    console.error(
      "Account API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat mengubah email.",
      },
      { status: 500 }
    );
  }
}