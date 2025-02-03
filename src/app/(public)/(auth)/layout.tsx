const LoginLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="min-h-screen w-full flex items-center justify-center bg-blue">
			<section className="bg-white rounded-sm shadow-md p-8 w-[440px] h-80 flex flex-col gap-4 border">
				{children}
			</section>
		</main>
	);
};

export default LoginLayout;
