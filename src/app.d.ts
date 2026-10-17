declare global {
	namespace App {
		interface PageData {
			stars: number | null;
			version: string | null;
		}
	}
}

export {};
