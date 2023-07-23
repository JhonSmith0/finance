import { ILogin, loginSchema } from "@/schema/auth";
import { loginService } from "@/services/login";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
  const form = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
  });
  const nav = useNavigate();

  return (
    <form
      onSubmit={form.handleSubmit(async (data) => {
        await loginService(data);
        nav("/");
      })}
    >
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
          Não tem uma conta? faça o registro <Link to="/register">aqui.</Link>
        </span>
      </p>
      <button type="submit">Login</button>
    </form>
  );
}
