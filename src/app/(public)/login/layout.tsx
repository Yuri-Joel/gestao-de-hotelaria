const LoginLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="min-h-screen w-screen flex items-center justify-center bg-custom-gradient">
			<div className="bg-white shadow-md px-8 py-8 w-[440px] h-[338px] flex flex-col gap-4 border">
				{children}
			</div>
		</div>
	);
};

export default LoginLayout;
