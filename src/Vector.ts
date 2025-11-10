interface Vector {
	readonly values: Float32Array;
}

abstract class VectorBase implements Vector {
	protected _values: Float32Array;

	constructor(values: number[]) {
		this._values = new Float32Array(values);
	}

	get values(): Float32Array {
		return this._values;
	}

	get length(): number {
		let sum = 0;
		for (const val of this._values) {
			sum += val * val;
		}
		return Math.sqrt(sum);
	}
}

abstract class Vector2Base extends VectorBase {
	get x(): number {
		return this._values[0] as number;
	}

	get y(): number {
		return this._values[1] as number;
	}

	set x(value: number) {
		this._values[0] = value;
	}

	set y(value: number) {
		this._values[1] = value;
	}
}

export class Vector2 extends Vector2Base {
	constructor(x: number, y: number) {
		super([x, y]);
	}

	// --- Instance methods
	set(x: number, y: number): Vector2 {
		this.x = x;
		this.y = y;
		return this;
	}

	clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	add(v: Vector2): Vector2 {
		this.x += v.x;
		this.y += v.y;
		return this;
	}

	sub(v: Vector2): Vector2 {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	scale(s: number): Vector2 {
		this.x *= s;
		this.y *= s;
		return this;
	}

	dot(v: Vector2): number {
		return this.x * v.x + this.y * v.y;
	}

	normalize(): Vector2 {
		const len = this.length;
		if (len > 0) {
			const inv = 1 / len;
			this.scale(inv);
		}
		return this;
	}

	// --- Static helper methods (imutable style) ---
	static add(a: Vector2, b: Vector2): Vector2 {
		return new Vector2(a.x + b.x, a.y + b.y);
	}

	static sub(a: Vector2, b: Vector2): Vector2 {
		return new Vector2(a.x - b.x, a.y - b.y);
	}

	static dot(a: Vector2, b: Vector2): number {
		return a.x * b.x + a.y * b.y;
	}
}

abstract class Vector3Base extends VectorBase {
	get x(): number {
		return this._values[0] as number;
	}

	get y(): number {
		return this._values[1] as number;
	}

	get z(): number {
		return this._values[2] as number;
	}

	set x(value: number) {
		this._values[0] = value;
	}

	set y(value: number) {
		this._values[1] = value;
	}

	set z(value: number) {
		this._values[2] = value;
	}
}

export class Vector3 extends Vector3Base {
	constructor(x: number, y: number, z: number) {
		super([x, y, z]);
	}

	// --- Instance methods
	set(x: number, y: number, z: number): Vector3 {
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	clone(): Vector3 {
		return new Vector3(this.x, this.y, this.z);
	}

	add(v: Vector3): Vector3 {
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
		return this;
	}

	sub(v: Vector3): Vector3 {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;
	}

	scale(s: number): Vector3 {
		this.x *= s;
		this.y *= s;
		this.z *= s;
		return this;
	}

	dot(v: Vector3): number {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}

	cross(v: Vector3): Vector3 {
		const x = this.y * v.z - this.z * v.y;
		const y = this.z * v.x - this.x * v.z;
		const z = this.x * v.y - this.y * v.x;
		this.set(x, y, z);
		return this;
	}

	normalize(): Vector3 {
		const len = this.length;
		if (len > 0) {
			const inv = 1 / len;
			this.scale(inv);
		}
		return this;
	}

	// --- Static helper methods (imutable style) ---
	static add(a: Vector3, b: Vector3): Vector3 {
		return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
	}

	static sub(a: Vector3, b: Vector3): Vector3 {
		return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
	}

	static dot(a: Vector3, b: Vector3): number {
		return a.x * b.x + a.y * b.y + a.z * b.z;
	}

	static cross(a: Vector3, b: Vector3): Vector3 {
		return new Vector3(
			a.y * b.z - a.z * b.y,
			a.z * b.x - a.x * b.z,
			a.x * b.y - a.y * b.x,
		);
	}
}
