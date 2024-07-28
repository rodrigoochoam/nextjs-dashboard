"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const FacturaSchema = z.object({
  uuid: z.string(),
  fecha_timbrado: z.string(),
  rfc_emisor: z.string(),
  nombre_emisor: z.string(),
  descripcion: z.string().optional(),
  importe: z.coerce.number().positive(),
  iva: z.coerce.number().positive(),
  total: z.coerce.number().positive(),
  status: z.enum(["Por Aprobar", "Por Pagae", "Pagada", "Rechazada"]),
});

const CreateFactura = FacturaSchema.omit({ uuid: true });
const UpdateFactura = FacturaSchema.omit({ uuid: true });

export async function createFactura(prevState: State, formData: FormData) {
  const validatedFields = CreateFactura.safeParse({
    fecha_timbrado: formData.get("fecha_timbrado"),
    rfc_emisor: formData.get("rfc_emisor"),
    nombre_emisor: formData.get("nombre_emisor"),
    descripcion: formData.get("descripcion"),
    importe: formData.get("importe"),
    iva: formData.get("iva"),
    total: formData.get("total"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Factura.",
    };
  }

  const {
    fecha_timbrado,
    rfc_emisor,
    nombre_emisor,
    descripcion,
    importe,
    iva,
    total,
    status,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO facturas (fecha_timbrado, rfc_emisor, nombre_emisor, descripcion, importe, iva, total, status)
      VALUES (${fecha_timbrado}, ${rfc_emisor}, ${nombre_emisor}, ${descripcion}, ${importe}, ${iva}, ${total}, ${status})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Factura.",
    };
  }

  revalidatePath("/dashboard/facturas");
  redirect("/dashboard/facturas");
}

export async function updateFactura(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateFactura.safeParse({
    fecha_timbrado: formData.get("fecha_timbrado"),
    rfc_emisor: formData.get("rfc_emisor"),
    nombre_emisor: formData.get("nombre_emisor"),
    descripcion: formData.get("descripcion"),
    importe: formData.get("importe"),
    iva: formData.get("iva"),
    total: formData.get("total"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Factura.",
    };
  }

  const {
    fecha_timbrado,
    rfc_emisor,
    nombre_emisor,
    descripcion,
    importe,
    iva,
    total,
    status,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE facturas
      SET fecha_timbrado = ${fecha_timbrado}, rfc_emisor = ${rfc_emisor}, nombre_emisor = ${nombre_emisor},
          descripcion = ${descripcion}, importe = ${importe}, iva = ${iva}, total = ${total}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Factura." };
  }

  revalidatePath("/dashboard/facturas");
  redirect("/dashboard/facturas");
}

export async function deleteFactura(id: string) {
  try {
    await sql`DELETE FROM facturas WHERE id = ${id}`;
    revalidatePath("/dashboard/facturas");
    return { message: "Deleted Factura." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Factura." };
  }
}

const UpdateFacturaSchema = z.object({
  id: z.string(),
  status: z.enum(["Por Aprobar", "Pagada", "Por Pagar", "Rechazada"]),
});
