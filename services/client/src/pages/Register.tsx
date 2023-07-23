import { IRegister, registerSchema } from "@/schema/auth";
import { registerService } from "@/services/register";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export function RegisterPage() {
  const form = useForm<IRegister>({
    resolver: yupResolver(registerSchema),
  });
  const nav = useNavigate();

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        await registerService(data);
        nav("/");
      })}
    >
      <fieldset>
        <label>Name</label>
        <input type="text" {...form.register("name")} />
      </fieldset>
      <fieldset>
        <label>Email</label>
        <input type="text" {...form.register("email")} />
      </fieldset>
      <fieldset>
        <label>Password</label>
        <input type="password" {...form.register("password")} />
      </fieldset>
      <p>
        <span>
          Já tem uma conta? faça o login <Link to="/login">aqui.</Link>
        </span>
      </p>
      <button type="submit">Registrar</button>
    </form>
  );
}
