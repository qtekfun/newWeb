export function Footer() {
  return (
    <footer className="py-6 mt-12 border-t">
      <div className="container mx-auto text-center text-muted-foreground px-4">
        <p>&copy; {new Date().getFullYear()} LightWrite. All rights reserved.</p>
      </div>
    </footer>
  );
}
