import { useEffect, useState } from "react";
import { fetchUsers } from "./Api/users";
import type { User } from "./types/user";

const tableStyle = {
    width: "100%",
    maxWidth: "1400px",
    borderCollapse: "collapse" as const,
};

const cellStyle = {
    border: "1px solid #ccc",
    padding: "8px",
};

export default function App() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [sortBy, setSortBy] = useState<string | null>(null);
    const [order, setOrder] = useState<"asc" | "desc" | null>(null);

    const [page, setPage] = useState(0);
    const limit = 10;

    const [menuColumn, setMenuColumn] = useState<string | null> (null)

    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    useEffect(() => {
        async function load() {
            try {
                setLoading(true);
                setError(null);

                // параметры запроса
                const params: {
                    limit: number;
                    skip: number;
                    sortBy?: string;
                    order?: "asc" | "desc";
                } = {
                    limit,
                    skip: page * limit,
                };

                // добавляем сортировку только если она включена
                if (sortBy && order) {
                    params.sortBy = sortBy;
                    params.order = order;
                }

                const data = await fetchUsers(params);
                setUsers(data.users);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Ошибка загрузки");
            } finally {
                setLoading(false);
            }
        }

        void load();
    }, [page, limit, sortBy, order]);

    function applySort(column: string, direction: "asc" | "desc" | null) {
        if (direction === null) {
            setSortBy(null)
            setOrder(null)
        } else {
            setSortBy(column)
            setOrder(direction)
        }
        setMenuColumn(null)
    }

    function handleSort(colum: string) {
        if(sortBy !== colum) {
            setSortBy(colum);
            setOrder("asc");
            return;
        }
        if (order === "asc"){
            setOrder("desc");
            return;
        }
        if (order === "desc"){
            setSortBy(null);
            setOrder(null);
            return;
        }

        setOrder("asc")
    }

    return (
        <div style={{ padding: 20, fontFamily: "Arial" }}>
            <h1>Users (API)</h1>

            {loading && <p>Загрузка...</p>}
            {error && <p style={{ color: "crimson" }}>Ошибка: {error}</p>}

            {!loading && !error && (
                <>
                    <table style={tableStyle}>
                        <thead>
                        <tr>
                            <th style={{ ...cellStyle, position: "relative"}}>
                                <span onClick={() => setMenuColumn("lastName")} style={{cursor: "pointer"}}>
                                    Фамилия ▾
                                </span>
                                {menuColumn === "lastName" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            background: "white",
                                            border: "1px solid #ccc",
                                            zIndex: 10,
                                        }}
                                    >
                                        <div onClick={()=> applySort("lastName", null)} style={{padding: 6, cursor: "pointer"}}>
                                            Без сортировки
                                        </div>
                                        <div onClick={() => applySort("lastName", "asc")} style ={{padding: 6, cursor: "pointer"}}>
                                            По возрастанию
                                        </div>
                                        <div onClick={()=> applySort("lastName", "desc")} style={{padding: 6, cursor: "pointer"}}>
                                            По убыванию
                                        </div>
                                    </div>
                                    )}
                                </th>
                            <th style={cellStyle}>Имя</th>
                            <th style={cellStyle}>Отчество</th>
                            <th style={{ ...cellStyle, position: "relative"}}>
                                <span onClick={() => setMenuColumn("age")} style={{cursor: "pointer"}}>
                                    Возраст ▾
                                </span>
                                {menuColumn === "age" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            background: "white",
                                            border: "1px solid #ccc",
                                            zIndex: 10,
                                        }}
                                    >
                                        <div onClick={()=> applySort("age", null)} style={{padding: 6, cursor: "pointer"}}>
                                            Без сортировки
                                        </div>
                                        <div onClick={() => applySort("age", "asc")} style ={{padding: 6, cursor: "pointer"}}>
                                            По возрастанию
                                        </div>
                                        <div onClick={()=> applySort("age", "desc")} style={{padding: 6, cursor: "pointer"}}>
                                            По убыванию
                                        </div>
                                    </div>
                                )}
                            </th>
                            <th style={{ ...cellStyle, position: "relative"}}>
                                <span onClick={() => setMenuColumn("gender")} style={{cursor: "pointer"}}>
                                    Пол ▾
                                </span>
                                {menuColumn === "gender" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            background: "white",
                                            border: "1px solid #ccc",
                                            zIndex: 10,
                                        }}
                                    >
                                        <div onClick={()=> applySort("gender", null)} style={{padding: 6, cursor: "pointer"}}>
                                            Без сортировки
                                        </div>
                                        <div onClick={() => applySort("gender", "asc")} style ={{padding: 6, cursor: "pointer"}}>
                                            По возрастанию
                                        </div>
                                        <div onClick={()=> applySort("gender", "desc")} style={{padding: 6, cursor: "pointer"}}>
                                            По убыванию
                                        </div>
                                    </div>
                                )}
                            </th>
                            <th style={{ ...cellStyle, position: "relative"}}>
                                <span onClick={() => setMenuColumn("phone")} style={{cursor: "pointer"}}>
                                    Номер телефона ▾
                                </span>
                                {menuColumn === "phone" && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "100%",
                                            left: 0,
                                            background: "white",
                                            border: "1px solid #ccc",
                                            zIndex: 10,
                                        }}
                                    >
                                        <div onClick={()=> applySort("phone", null)} style={{padding: 6, cursor: "pointer"}}>
                                            Без сортировки
                                        </div>
                                        <div onClick={() => applySort("phone", "asc")} style ={{padding: 6, cursor: "pointer"}}>
                                            По возрастанию
                                        </div>
                                        <div onClick={()=> applySort("phone", "desc")} style={{padding: 6, cursor: "pointer"}}>
                                            По убыванию
                                        </div>
                                    </div>
                                )}
                            </th>
                            <th style={cellStyle}>Email</th>
                            <th style={cellStyle}>Страна</th>
                            <th style={cellStyle}>Город</th>
                        </tr>
                        </thead>

                        <tbody>
                        {users.map((u) => (
                            <tr
                                key={u.id}
                                onClick={() => setSelectedUser(u)}
                                style = {{cursor: "pointer"}}
                            >
                                <td style={cellStyle}>{u.lastName}</td>
                                <td style={cellStyle}>{u.firstName}</td>
                                <td style={cellStyle}>{u.maidenName}</td>
                                <td style={cellStyle}>{u.age}</td>
                                <td style={cellStyle}>{u.gender}</td>
                                <td style={cellStyle}>{u.phone}</td>
                                <td style={cellStyle}>{u.email}</td>
                                <td style={cellStyle}>{u.address.country}</td>
                                <td style={cellStyle}>{u.address.city}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {selectedUser &&(
                        <div
                            onClick={() => selectedUser(null)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: "rgba(0,0,0,0.45)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 20,
                                zIndex: 999,
                            }}
                        >
                            <div
                                onClick={(e) => e.stopPropagation()}
                                style = {{
                                    background: "white",
                                    borderRadius: 12,
                                    width: "100%",
                                    maxWidth: 650,
                                    padding: 20,
                                }}
                            >
                                <div style={{display: "flex", gap: 16, alignItems: "center" }}>
                                    <img
                                        src={selectedUser.image}
                                        alt="avatar"
                                        width={80}
                                        height={80}
                                        style={{borderRadius: 12}}
                                    />
                                    <div>
                                        <h2 style={{margin: 0}}>
                                            {selectedUser.lastName} {selectedUser.firstName}{" "}
                                            {selectedUser.maidenName}
                                        </h2>
                                        <div style={{opacity: 0.75}}>
                                            {selectedUser.gender}, {selectedUser.age} лет
                                        </div>
                                    </div>
                                </div>

                                <hr style={{margin: "16px 0"}} />

                                <div style={{lineHeight: 1.6}}>
                                    <div><b>Телефон:</b> {selectedUser.phone}</div>
                                    <div><b>Email:</b> {selectedUser.email}</div>
                                    <div>
                                        <b>Адрec:</b> {selectedUser.address.address}, {selectedUser.address.city},{" "}
                                        {selectedUser.address.state}, {selectedUser.address.country}
                                    </div>
                                    <div><b>Рост:</b> {selectedUser.height}</div>
                                    <div><b>Вес:</b> {selectedUser.weight}</div>
                                </div>

                                <div style = {{marginTop: 16, display:"flex", justifyContent: "flex-end"}}>
                                    <button onClick={()=> setSelectedUser(null)}>Закрыть</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Пагинация */}
                    <div
                        style={{
                            marginTop: 16,
                            display: "flex",
                            gap: 12,
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 0))}
                            disabled={page === 0}
                        >
                            Назад
                        </button>

                        <span>Страница {page + 1}</span>

                        <button onClick={() => setPage((p) => p + 1)}>Вперёд</button>
                    </div>

                    {}
                    <div style={{ marginTop: 10, fontSize: 14, opacity: 0.7 }}>
                        sortBy: {String(sortBy)} | order: {String(order)}
                    </div>
                </>
            )}
        </div>
    );
}
